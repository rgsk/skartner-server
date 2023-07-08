/*
  Warnings:

  - You are about to drop the `RoleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoleToUser" DROP CONSTRAINT "RoleToUser_assignerId_fkey";

-- DropForeignKey
ALTER TABLE "RoleToUser" DROP CONSTRAINT "RoleToUser_roleId_fkey";

-- DropForeignKey
ALTER TABLE "RoleToUser" DROP CONSTRAINT "RoleToUser_userId_fkey";

-- DropTable
DROP TABLE "RoleToUser";

-- CreateTable
CREATE TABLE "RelationRoleToUser" (
    "roleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignerId" TEXT NOT NULL,

    CONSTRAINT "RelationRoleToUser_pkey" PRIMARY KEY ("roleId","userId")
);

-- AddForeignKey
ALTER TABLE "RelationRoleToUser" ADD CONSTRAINT "RelationRoleToUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationRoleToUser" ADD CONSTRAINT "RelationRoleToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationRoleToUser" ADD CONSTRAINT "RelationRoleToUser_assignerId_fkey" FOREIGN KEY ("assignerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
