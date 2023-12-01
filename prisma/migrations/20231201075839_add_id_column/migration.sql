/*
  Warnings:

  - The primary key for the `PermissionHierarchy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RelationPermissionToRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RelationPermissionToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RelationRoleToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[parentPermissionId,childPermissionId]` on the table `PermissionHierarchy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[permissionId,roleId]` on the table `RelationPermissionToRole` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[permissionId,userId]` on the table `RelationPermissionToUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleId,userId]` on the table `RelationRoleToUser` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `PermissionHierarchy` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `RelationPermissionToRole` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `RelationPermissionToUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `RelationRoleToUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "PermissionHierarchy" DROP CONSTRAINT "PermissionHierarchy_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "PermissionHierarchy_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RelationPermissionToRole" DROP CONSTRAINT "RelationPermissionToRole_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "RelationPermissionToRole_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RelationPermissionToUser" DROP CONSTRAINT "RelationPermissionToUser_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "RelationPermissionToUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RelationRoleToUser" DROP CONSTRAINT "RelationRoleToUser_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "RelationRoleToUser_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionHierarchy_parentPermissionId_childPermissionId_key" ON "PermissionHierarchy"("parentPermissionId", "childPermissionId");

-- CreateIndex
CREATE UNIQUE INDEX "RelationPermissionToRole_permissionId_roleId_key" ON "RelationPermissionToRole"("permissionId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "RelationPermissionToUser_permissionId_userId_key" ON "RelationPermissionToUser"("permissionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "RelationRoleToUser_roleId_userId_key" ON "RelationRoleToUser"("roleId", "userId");
