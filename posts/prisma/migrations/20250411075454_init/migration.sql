-- CreateTable
CREATE TABLE "posts" (
    "ref_publication" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3) NOT NULL,
    "author_Id" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("ref_publication")
);

-- CreateIndex
CREATE INDEX "posts_author_id_index" ON "posts"("author_Id");
