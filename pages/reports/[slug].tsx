import { pages, links } from "app/url";
import { postGetStaticPaths } from "app/blog/post-get-static-paths";
import { postGetStaticProps } from "app/blog/post-get-static-props";
import paths from "app/cms/paths.json";
import { post } from "app/blog/post";

export default post({
  getPostHref(slug) {
    return links.reportsPost.href({ slug });
  },
});

export const getStaticProps = pages.reportsPost.getStaticProps(
  postGetStaticProps({
    postsSource: paths.reports,
    blogHref: links.reports.href,
    blogHrefLabel: links.reports.label,
  })
);

export const getStaticPaths = pages.reportsPost.getStaticPaths(
  postGetStaticPaths(paths.reports)
);

export const priority = pages.reports.priority(0.5);
export const disallow = pages.reports.disallow(false);
export const changeFrequency = pages.reports.changeFrequency("daily");
export const getLastModificationDate = pages.reports.getLastModificationDate(
  async () => new Date()
);
