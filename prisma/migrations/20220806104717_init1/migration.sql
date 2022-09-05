/*
  Warnings:

  - Changed the type of `variant_1_qty` on the `OrderItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `variant_2_qty` on the `OrderItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "variant_1_qty",
ADD COLUMN     "variant_1_qty" INTEGER NOT NULL,
DROP COLUMN "variant_2_qty",
ADD COLUMN     "variant_2_qty" INTEGER NOT NULL;
