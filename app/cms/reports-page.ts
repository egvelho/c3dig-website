import { GetCollectionType } from "@egvelho/next-meta/cms/collection";
import { blogPostData } from "./blog-post-data";

export type ReportsPage = GetCollectionType<typeof reportsPage>;

export const reportsPage = blogPostData({
  category: "Reports",
  folder: "app/blog/reports",
  label: "Reports",
  labelSingular: "Report",
});
