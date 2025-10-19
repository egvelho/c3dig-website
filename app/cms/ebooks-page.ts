import { GetCollectionType } from "@egvelho/next-meta/cms/collection";
import { blogPostData } from "./blog-post-data";

export type EbooksPage = GetCollectionType<typeof ebooksPage>;

export const ebooksPage = blogPostData({
  category: "Livros e ebooks",
  folder: "app/blog/ebooks",
  label: "Livros e ebooks",
  labelSingular: "Livro ou ebook",
});
