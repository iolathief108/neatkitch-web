/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "documents_key_key" ON "documents"("key");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
