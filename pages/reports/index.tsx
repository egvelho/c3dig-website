import { pages, client, links } from "app/url";
import paths from "app/cms/paths.json";
import { blog } from "app/blog/blog";
import { blogGetStaticProps } from "app/blog/blog-get-static-props";

export default blog({
  getPosts: client.getReports,
  getPostsForTag: client.getReportsForTag,
  getPostHref(slug) {
    return links.reportsPost.href({ slug });
  },
});

export const getStaticProps = pages.reports.getStaticProps(
  blogGetStaticProps({
    title: links.reports.longLabel,
    description: "Reports do C3Dig.",
    image: "/android-chrome-512x512.png",
    pageHref: links.reports.href,
    pageHrefLabel: links.reports.label,
    postsApi: paths.reportsApi,
    postsByTagApi: paths.reportsByTagApi,
    postsSource: paths.reports,
  })
);

export const priority = pages.reports.priority(0.5);
export const disallow = pages.reports.disallow(false);
export const changeFrequency = pages.reports.changeFrequency("daily");
export const getLastModificationDate = pages.reports.getLastModificationDate(
  async () => new Date()
);
