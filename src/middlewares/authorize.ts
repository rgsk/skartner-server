import { db } from 'db';
import { NextFunction, Request, Response } from 'express';

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
  (permissionName: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the user via token
      const user = await db.user.findUnique({ where: { email: 'rahul' } });
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
