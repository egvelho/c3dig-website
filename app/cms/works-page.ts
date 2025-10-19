import { GetCollectionType } from "@egvelho/next-meta/cms/collection";
import { blogPostData } from "./blog-post-data";

export type WorksPage = GetCollectionType<typeof worksPage>;

export const worksPage = blogPostData({
  category: "Teses e dissertações",
  folder: "app/blog/works",
  label: "Teses e dissertações",
  labelSingular: "Tese ou dissertação",
});
