import { db } from 'db';
import { NextFunction, Request, Response } from 'express';
import memoize from 'lib/cache/memoize';
import { addProps, getProps } from 'middlewareProps';
import { Middlewares } from 'middlewares';

const circularHierarchyMessage = 'Circular Permission Hierarchy detected';
const goUpInHierarchyToCheckIfExplicitFalseIsSet: (data: {
  permissionName: string;
  userId: string;
  hierarchyChecked: string[];
}) => Promise<{
  hasPermission: boolean;
  hierarchyChecked: string[];
  permissionFailed: string;
  assignedPermissionsThatFailed: string[];
  assignedRolesThatFailed: string[];
} | null> = async ({ permissionName, userId, hierarchyChecked }) => {
  if (hierarchyChecked.includes(permissionName)) {
    throw new Error(circularHierarchyMessage);
  }
  const falseExists = await db.permission.findFirst({
    where: {
      name: permissionName,
      OR: [
        {
          relationPermissionToUserAsPermission: {
            some: { userId: userId, isAllowed: false },
          },
        },
        {
          relationPermissionToRoleAsPermission: {
            some: {
              role: {
                relationRoleToUserAsRole: { some: { userId: userId } },
              },
              isAllowed: false,
            },
          },
        },
      ],
    },
    select: {
      relationPermissionToUserAsPermission: {
        select: { permission: { select: { name: true } } },
        where: {
          userId: userId,
          isAllowed: false,
        },
      },
      relationPermissionToRoleAsPermission: {
        select: { role: { select: { name: true } } },
        where: {
          role: {
            relationRoleToUserAsRole: { some: { userId: userId } },
          },
          isAllowed: false,
        },
      },
    },
  });

  if (falseExists) {
    return {
      hasPermission: false,
      hierarchyChecked: [...hierarchyChecked, permissionName],
      permissionFailed: permissionName,
      assignedPermissionsThatFailed:
        falseExists.relationPermissionToUserAsPermission.map(
          (v) => v.permission.name
        ),
      assignedRolesThatFailed:
        falseExists.relationPermissionToRoleAsPermission.map(
          (v) => v.role.name
        ),
    };
  }

  const permission = await db.permission.findUnique({
    where: {
      name: permissionName,
    },
    select: {
      permissionHierarchyAsChild: {
        select: { parentPermission: { select: { name: true } } },
      },
    },
  });
  if (permission) {
    // check for all the parents
    for (const {
      parentPermission: { name },
    } of permission.permissionHierarchyAsChild) {
      const result = await goUpInHierarchyToCheckIfExplicitFalseIsSet({
        userId,
        permissionName: name,
        hierarchyChecked: [...hierarchyChecked, permissionName],
      });
      if (result && !result.hasPermission) {
        return result;
      }
    }
  }
  return null;
};

const goUpInHierarchyToCheckIfExplicitTrueIsSet: (data: {
  permissionName: string;
  userId: string;
  hierarchyChecked: string[];
}) => Promise<{
  hasPermission: boolean;
  hierarchyChecked: string[];
  permissionSucceeded: string;
  assignedPermissionsThatSucceeded: string[];
  assignedRolesThatSucceeded: string[];
} | null> = async ({ permissionName, userId, hierarchyChecked }) => {
  if (hierarchyChecked.includes(permissionName)) {
    throw new Error(circularHierarchyMessage);
  }
  const trueExists = await db.permission.findFirst({
    where: {
      name: permissionName,
      OR: [
        {
          relationPermissionToUserAsPermission: {
            some: { userId: userId, isAllowed: true },
          },
        },
        {
          relationPermissionToRoleAsPermission: {
            some: {
              role: {
                relationRoleToUserAsRole: { some: { userId: userId } },
              },
              isAllowed: true,
            },
          },
        },
      ],
    },
    select: {
      relationPermissionToUserAsPermission: {
        select: { permission: { select: { name: true } } },
        where: {
          userId: userId,
          isAllowed: true,
        },
      },
      relationPermissionToRoleAsPermission: {
        select: { role: { select: { name: true } } },
        where: {
          role: {
            relationRoleToUserAsRole: { some: { userId: userId } },
          },
          isAllowed: true,
        },
      },
    },
  });
  if (trueExists) {
    return {
      hasPermission: true,
      permissionSucceeded: permissionName,
      hierarchyChecked: [...hierarchyChecked, permissionName],
      assignedPermissionsThatSucceeded:
        trueExists.relationPermissionToUserAsPermission.map(
          (v) => v.permission.name
        ),
      assignedRolesThatSucceeded:
        trueExists.relationPermissionToRoleAsPermission.map((v) => v.role.name),
    };
  }
  // check in parents if someone is true
  const permission = await db.permission.findUnique({
    where: {
      name: permissionName,
    },
    select: {
      permissionHierarchyAsChild: {
        select: { parentPermission: { select: { name: true } } },
      },
    },
  });
  if (permission) {
    // check for all the parents
    for (const {
      parentPermission: { name },
    } of permission.permissionHierarchyAsChild) {
      const result = await goUpInHierarchyToCheckIfExplicitTrueIsSet({
        userId,
        permissionName: name,
        hierarchyChecked: [...hierarchyChecked, permissionName],
      });
      if (result && result.hasPermission) {
        return result;
      }
    }
  }
  return null;
};

type RoleThatAffect = {
  roleName: string;
  permissionName: string;
  isAllowed: boolean | null;
};

const goUpInHierarchyToCheckWhereTrueCanBeSet: (data: {
  permissionName: string;
  hierarchyChecked: string[];
}) => Promise<{
  permissionsThatCanBeGranted: Set<string>;
  rolesThatAffectThisPermission: RoleThatAffect[];
}> = async ({ permissionName, hierarchyChecked }) => {
  if (hierarchyChecked.includes(permissionName)) {
    throw new Error(circularHierarchyMessage);
  }
  const exists = await db.permission.findFirst({
    where: {
      name: permissionName,
    },
    select: {
      permissionHierarchyAsChild: {
        select: { parentPermission: { select: { name: true } } },
      },
      relationPermissionToRoleAsPermission: {
        select: {
          isAllowed: true,
          role: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  const rolesThatAffectThisPermission: RoleThatAffect[] = [];
  const permissionsThatCanBeGranted = new Set<string>([]);

  permissionsThatCanBeGranted.add(permissionName);

  if (exists) {
    for (const {
      role: { name },
      isAllowed,
    } of exists.relationPermissionToRoleAsPermission) {
      rolesThatAffectThisPermission.push({
        permissionName: permissionName,
        roleName: name,
        isAllowed: isAllowed,
      });
    }

    for (const {
      parentPermission: { name },
    } of exists.permissionHierarchyAsChild) {
      const result = await goUpInHierarchyToCheckWhereTrueCanBeSet({
        permissionName: name,
        hierarchyChecked: [...hierarchyChecked, permissionName],
      });

      result.permissionsThatCanBeGranted.forEach((name) =>
        permissionsThatCanBeGranted.add(name)
      );
      result.rolesThatAffectThisPermission.forEach((role) =>
        rolesThatAffectThisPermission.push(role)
      );
    }
  }
  return {
    permissionsThatCanBeGranted,
    rolesThatAffectThisPermission,
  };
};

const getRolesThatCanBeGranted = (
  rolesThatAffectThisPermission: RoleThatAffect[]
) => {
  // console.log({ rolesThatAffectThisPermission });
  const mp: Record<string, boolean> = {};
  for (const {
    roleName,
    permissionName,
    isAllowed,
  } of rolesThatAffectThisPermission) {
    if (isAllowed !== null) {
      if (roleName in mp) {
        mp[roleName] = mp[roleName] && isAllowed;
      } else {
        mp[roleName] = isAllowed;
      }
    }
  }
  const rolesThatCanBeGranted = new Set<string>();
  for (const roleName in mp) {
    if (mp[roleName]) {
      rolesThatCanBeGranted.add(roleName);
    }
  }
  return rolesThatCanBeGranted;
};

export const checkUserAuthorizedForPermission = memoize(
  'db',
  'checkUserAuthorizedForPermission',
  async ({
    permissionName,
    userId,
  }: {
    permissionName: string;
    userId: string;
  }) => {
    // console.log('checkUserAuthorizedForPermission called');
    // console.log({
    //   permissionName,
    //   userId,
    // });
    const falseResult = await goUpInHierarchyToCheckIfExplicitFalseIsSet({
      permissionName,
      userId,
      hierarchyChecked: [],
    });
    // console.log({ falseResult });
    if (falseResult && !falseResult.hasPermission) {
      return falseResult;
    }
    const trueResult = await goUpInHierarchyToCheckIfExplicitTrueIsSet({
      permissionName,
      userId,
      hierarchyChecked: [],
    });
    // console.log({ trueResult });
    if (trueResult && trueResult.hasPermission) {
      return trueResult;
    }

    const whereTrueResult = await goUpInHierarchyToCheckWhereTrueCanBeSet({
      permissionName,
      hierarchyChecked: [],
    });
    const rolesThatCanBeGranted = getRolesThatCanBeGranted(
      whereTrueResult.rolesThatAffectThisPermission
    );
    const finalResult = {
      hasPermission: false,
      permissionsThatCanBeGranted: [
        ...whereTrueResult.permissionsThatCanBeGranted,
      ],
      // set was not properly sent as json
      // so we convert to array
      rolesThatCanBeGranted: [...rolesThatCanBeGranted],
      rolesThatAffectThisPermission:
        whereTrueResult.rolesThatAffectThisPermission,
    };
    // console.log({ finalResult });
    return finalResult;
  }
);

const authorize =
  (permissionName: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = getProps<Middlewares.Authenticate>(
        req,
        Middlewares.Keys.Authenticate
      );
      // get the user via token
      if (user) {
        const result = await checkUserAuthorizedForPermission({
          userId: user.id,
          permissionName,
        });
        // console.log({ result });
        if (result.hasPermission) {
          return next();
        }
        addProps<Middlewares.ErrorData>(
          req,
          { data: result },
          Middlewares.Keys.ErrorData
        );
      }

      throw new Error(`Authorization Error: ${permissionName}`);
    } catch (err) {
      next(err);
    }
  };

export default authorize;
