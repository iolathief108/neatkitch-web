/*
  Warnings:

  - A unique constraint covering the columns `[product_id,order_id]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id,key]` on the table `OrderMeta` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_product_id_order_id_key" ON "OrderItem"("product_id", "order_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderMeta_order_id_key_key" ON "OrderMeta"("order_id", "key");
