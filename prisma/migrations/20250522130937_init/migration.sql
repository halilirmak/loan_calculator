/*
  Warnings:

  - You are about to drop the column `termsMonth` on the `LoanApplication` table. All the data in the column will be lost.
  - Added the required column `termMonths` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoanApplication" DROP COLUMN "termsMonth",
ADD COLUMN     "termMonths" INTEGER NOT NULL;
