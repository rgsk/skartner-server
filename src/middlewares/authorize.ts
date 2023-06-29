import { db } from 'db';
import { NextFunction, Request, Response } from 'express';

const authorize =
  (permissionName: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the user via token
      const user = await db.user.findUnique({ where: { email: 'rahul' } });
      if (user) {
        const noEntryIsFalse = await db.permission.count({
          where: {
            name: permissionName,
            relationPermissionToUserAsPermission: {
              none: { userId: user.id, isAllowed: false },
            },
            relationPermissionToRoleAsPermission: {
              none: {
                role: {
                  relationRoleToUserAsRole: { some: { userId: user.id } },
                },
                isAllowed: false,
              },
            },
            permissionHierarchyAsChild: {
              every: {
                parentPermission: {
                  relationPermissionToUserAsPermission: {
                    none: { userId: user.id, isAllowed: false },
                  },
                  relationPermissionToRoleAsPermission: {
                    none: {
                      role: {
                        relationRoleToUserAsRole: {
                          some: { userId: user.id },
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
        console.log({ noEntryIsFalse });
        if (!noEntryIsFalse) {
          throw new Error('Un-Authorized');
        }
        const someEntryIsTrue = await db.permission.count({
          where: {
            name: permissionName,
            OR: [
              {
                relationPermissionToUserAsPermission: {
                  some: { userId: user.id, isAllowed: true },
                },
              },
              {
                relationPermissionToRoleAsPermission: {
                  some: {
                    role: {
                      relationRoleToUserAsRole: {
                        some: { userId: user.id },
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
                            some: { userId: user.id, isAllowed: true },
                          },
                        },
                        {
                          relationPermissionToRoleAsPermission: {
                            some: {
                              role: {
                                relationRoleToUserAsRole: {
                                  some: { userId: user.id },
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
        console.log({ someEntryIsTrue });
        if (someEntryIsTrue) {
          return next();
        }
      }
      throw new Error('Un-Authorized');
    } catch (err) {
      next(err);
    }
  };

export default authorize;
