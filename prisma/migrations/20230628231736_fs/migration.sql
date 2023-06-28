-- CreateTable
CREATE TABLE "Permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelationPermissionToUser" (
    "permissionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "granterId" TEXT NOT NULL,
    "isAllowed" BOOLEAN,

    CONSTRAINT "RelationPermissionToUser_pkey" PRIMARY KEY ("permissionId","userId")
);

-- CreateTable
CREATE TABLE "RelationPermissionToRole" (
    "permissionId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "granterId" TEXT NOT NULL,
    "isAllowed" BOOLEAN,

    CONSTRAINT "RelationPermissionToRole_pkey" PRIMARY KEY ("permissionId","roleId")
);

-- CreateTable
CREATE TABLE "PermissionHierarchy" (
    "parentPermissionId" TEXT NOT NULL,
    "childPermissionId" TEXT NOT NULL,

    CONSTRAINT "PermissionHierarchy_pkey" PRIMARY KEY ("parentPermissionId","childPermissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_name_key" ON "Permissions"("name");

-- AddForeignKey
ALTER TABLE "RelationPermissionToUser" ADD CONSTRAINT "RelationPermissionToUser_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationPermissionToUser" ADD CONSTRAINT "RelationPermissionToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationPermissionToUser" ADD CONSTRAINT "RelationPermissionToUser_granterId_fkey" FOREIGN KEY ("granterId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationPermissionToRole" ADD CONSTRAINT "RelationPermissionToRole_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationPermissionToRole" ADD CONSTRAINT "RelationPermissionToRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationPermissionToRole" ADD CONSTRAINT "RelationPermissionToRole_granterId_fkey" FOREIGN KEY ("granterId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionHierarchy" ADD CONSTRAINT "PermissionHierarchy_parentPermissionId_fkey" FOREIGN KEY ("parentPermissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionHierarchy" ADD CONSTRAINT "PermissionHierarchy_childPermissionId_fkey" FOREIGN KEY ("childPermissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
