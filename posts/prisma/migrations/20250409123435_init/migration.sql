-- Renommer la table Publication en Post
ALTER TABLE "Publication" RENAME TO "Post";

-- Renommer les colonnes
ALTER TABLE "Post" RENAME COLUMN "ref_publication" TO "id";
ALTER TABLE "Post" RENAME COLUMN "contenu" TO "content";
ALTER TABLE "Post" RENAME COLUMN "date_creation" TO "createdAt";
ALTER TABLE "Post" RENAME COLUMN "date_modification" TO "updatedAt";
