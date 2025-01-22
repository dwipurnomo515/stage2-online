/*
  Warnings:

  - A unique constraint covering the columns `[userId,replyId]` on the table `ReplyLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReplyLike_userId_replyId_key" ON "ReplyLike"("userId", "replyId");
