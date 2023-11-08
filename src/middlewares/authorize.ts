import { Permissions } from 'constants/Permissions';
import { db } from 'db';
import { NextFunction, Request, Response } from 'express';
import { getProps } from 'middlewareProps';
import { Middlewares } from 'middlewares';

export const checkUserAuthorizedForPermission = async ({
  permissionName,
  userId,
}: {
  permissionName: string;
  userId: string;
}) => {
  const noEntryIsFalse = await db.permission.count({
    where: {
      name: permissionName,
      relationPermissionToUserAsPermission: {
        none: { userId: userId, isAllowed: false },
      },
      relationPermissionToRoleAsPermission: {
        none: {
          role: {
            relationRoleToUserAsRole: { some: { userId: userId } },
          },
          isAllowed: false,
        },
      },
      permissionHierarchyAsChild: {
        every: {
          parentPermission: {
            relationPermissionToUserAsPermission: {
              none: { userId: userId, isAllowed: false },
            },
            relationPermissionToRoleAsPermission: {
              none: {
                role: {
                  relationRoleToUserAsRole: {
                    some: { userId: userId },
                  },
                },
                isAllowed: false,
              },
            },
          },
        },
      },
    },
  });
  //   console.log({ noEntryIsFalse });
  if (!noEntryIsFalse) {
    return false;
  }
  const someEntryIsTrue = await db.permission.count({
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
                relationRoleToUserAsRole: {
                  some: { userId: userId },
                },
              },
              isAllowed: true,
            },
          },
        },
        {
          permissionHierarchyAsChild: {
            some: {
              parentPermission: {
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
                          relationRoleToUserAsRole: {
                            some: { userId: userId },
                          },
                        },
                        isAllowed: true,
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  });
  //   console.log({ someEntryIsTrue });
  if (someEntryIsTrue) {
    return true;
  }
  return false;
};

const authorize =
  (permissionName: Permissions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = getProps<Middlewares.Authenticate>(
        req,
        Middlewares.Keys.authenticate
      );
      // get the user via token
      if (user) {
        const isAuthorized = await checkUserAuthorizedForPermission({
          userId: user.id,
          permissionName,
        });
        if (isAuthorized) {
          return next();
        }
      }
      throw new Error('Un-Authorized');
    } catch (err) {
      next(err);
    }
  };

export default authorize;
