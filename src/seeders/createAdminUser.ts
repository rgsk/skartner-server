import { db } from 'db';

const rootUserEmail = 'rahulguptasde@gmail.com';

const usersData = [{ email: 'rahulguptadev1@gmail.com' }];

export const createAdminUser = async () => {
  const rootUser = await db.user.upsert({
    where: { email: rootUserEmail },
    create: { email: rootUserEmail },
    update: {},
  });
  // create users if not exists
  const { count: usersCreatedCount } = await db.user.createMany({
    data: usersData.map((u) => {
      return {
        email: u.email,
      };
    }),
    skipDuplicates: true,
  });
  //   console.log({ usersCreatedCount });
  const users = await db.user.findMany({
    where: { email: { in: usersData.map((u) => u.email) } },
  });
  // create 'ACCESS_ADMIN' permission if not exists
  const accessAdminPermission = await db.permission.upsert({
    where: {
      name: 'ACCESS_ADMIN',
    },
    update: {},
    create: {
      name: 'ACCESS_ADMIN',
      meta: { description: 'access admin dashboard' },
    },
  });
  // create 'ADMIN' role if not exists
  const adminRole = await db.role.upsert({
    where: {
      name: 'ADMIN',
    },
    update: {},
    create: {
      name: 'ADMIN',

      meta: {
        description:
          'assigning this role to user will grant all admin permissions to that user',
      },
    },
  });
  // connect 'ACCESS_ADMIN' permission and 'ADMIN' role
  const accessAdminToAdminRelation = await db.relationPermissionToRole.upsert({
    where: {
      permissionId_roleId: {
        permissionId: accessAdminPermission.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      permissionId: accessAdminPermission.id,
      roleId: adminRole.id,
      granterId: rootUser.id,
      isAllowed: true,
    },
  });

  // grant 'ADMIN' role to user
  const { count: rolesAssignedCount } = await db.relationRoleToUser.createMany({
    data: [rootUser, ...users].map((u) => {
      return {
        assignerId: rootUser.id,
        roleId: adminRole.id,
        userId: u.id,
      };
    }),
    skipDuplicates: true,
  });
  console.log({ rolesAssignedCount });
};
