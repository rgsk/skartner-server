import permissions from 'constants/permissions';
import { Roles } from 'constants/Roles';
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

  // create 'Access Admin Dashboard' permission if not exists
  const accessAdminDashboardPermission = await db.permission.upsert({
    where: {
      name: permissions['Access Admin Dashboard'].key,
    },
    update: {},
    create: {
      name: permissions['Access Admin Dashboard'].key,
      meta: { description: 'access admin dashboard' },
    },
  });

  // create 'Access Graphql Playground' permission if not exists
  const accessGraphqlPlaygroundPermission = await db.permission.upsert({
    where: {
      name: permissions['Access Graphql Playground'].key,
    },
    update: {},
    create: {
      name: permissions['Access Graphql Playground'].key,
    },
  });

  const accessBullMonitorPermission = await db.permission.upsert({
    where: {
      name: permissions['Access Bull Monitor'].key,
    },
    update: {},
    create: {
      name: permissions['Access Bull Monitor'].key,
    },
  });

  const accessConfidentialTablesPermission = await db.permission.upsert({
    where: {
      name: permissions['Access Admin Dashboard']['Access Confidential Tables']
        .key,
    },
    update: {},
    create: {
      name: permissions['Access Admin Dashboard']['Access Confidential Tables']
        .key,
    },
  });

  await db.permissionHierarchy.upsert({
    where: {
      parentPermissionId_childPermissionId: {
        parentPermissionId: accessAdminDashboardPermission.id,
        childPermissionId: accessConfidentialTablesPermission.id,
      },
    },
    update: {},
    create: {
      parentPermissionId: accessAdminDashboardPermission.id,
      childPermissionId: accessConfidentialTablesPermission.id,
    },
  });

  const accessUsersTablesPermission = await db.permission.upsert({
    where: {
      name: permissions['Access Admin Dashboard']['Access Confidential Tables'][
        'Access Users Table'
      ].key,
    },
    update: {},
    create: {
      name: permissions['Access Admin Dashboard']['Access Confidential Tables'][
        'Access Users Table'
      ].key,
    },
  });

  const accessGreWordsTablesPermission = await db.permission.upsert({
    where: {
      name: permissions['Access Admin Dashboard']['Access Confidential Tables'][
        'Access GreWords Table'
      ].key,
    },
    update: {},
    create: {
      name: permissions['Access Admin Dashboard']['Access Confidential Tables'][
        'Access GreWords Table'
      ].key,
    },
  });

  await db.permissionHierarchy.upsert({
    where: {
      parentPermissionId_childPermissionId: {
        parentPermissionId: accessConfidentialTablesPermission.id,
        childPermissionId: accessUsersTablesPermission.id,
      },
    },
    update: {},
    create: {
      parentPermissionId: accessConfidentialTablesPermission.id,
      childPermissionId: accessUsersTablesPermission.id,
    },
  });

  await db.permissionHierarchy.upsert({
    where: {
      parentPermissionId_childPermissionId: {
        parentPermissionId: accessConfidentialTablesPermission.id,
        childPermissionId: accessGreWordsTablesPermission.id,
      },
    },
    update: {},
    create: {
      parentPermissionId: accessConfidentialTablesPermission.id,
      childPermissionId: accessGreWordsTablesPermission.id,
    },
  });

  // create 'Admin' role if not exists
  const adminRole = await db.role.upsert({
    where: {
      name: Roles.Admin,
    },
    update: {},
    create: {
      name: Roles.Admin,

      meta: {
        description:
          'assigning this role to user will grant all admin permissions to that user',
      },
    },
  });
  // connect 'Access Admin Dashboard' permission and 'Admin' role
  const accessAdminToAdminRelation = await db.relationPermissionToRole.upsert({
    where: {
      permissionId_roleId: {
        permissionId: accessAdminDashboardPermission.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      permissionId: accessAdminDashboardPermission.id,
      roleId: adminRole.id,
      granterId: rootUser.id,
      isAllowed: true,
    },
  });

  // connect 'Access Graphql Playground' permission and 'Admin' role
  const accessGraphqlPlaygroundToAdminRelation =
    await db.relationPermissionToRole.upsert({
      where: {
        permissionId_roleId: {
          permissionId: accessGraphqlPlaygroundPermission.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        permissionId: accessGraphqlPlaygroundPermission.id,
        roleId: adminRole.id,
        granterId: rootUser.id,
        isAllowed: true,
      },
    });

  const accessBullMonitorToAdminRelation =
    await db.relationPermissionToRole.upsert({
      where: {
        permissionId_roleId: {
          permissionId: accessBullMonitorPermission.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        permissionId: accessBullMonitorPermission.id,
        roleId: adminRole.id,
        granterId: rootUser.id,
        isAllowed: true,
      },
    });

  // grant 'Admin' role to user
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
