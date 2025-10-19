import { GetCollectionType } from "@egvelho/next-meta/cms/collection";
import { blogPostData } from "./blog-post-data";

export type PapersPage = GetCollectionType<typeof papersPage>;

export const papersPage = blogPostData({
  category: "Artigos científicos",
  folder: "app/blog/papers",
  label: "Artigos científicos",
  labelSingular: "Artigo científico",
});
