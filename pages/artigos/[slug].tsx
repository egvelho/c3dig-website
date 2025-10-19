import { pages, links } from "app/url";
import { postGetStaticPaths } from "app/blog/post-get-static-paths";
import { postGetStaticProps } from "app/blog/post-get-static-props";
import paths from "app/cms/paths.json";
import { post } from "app/blog/post";

export default post({
  getPostHref(slug) {
    return links.papersPost.href({ slug });
  },
});

export const getStaticProps = pages.papersPost.getStaticProps(
  postGetStaticProps({
    postsSource: paths.papers,
    blogHref: links.papers.href,
    blogHrefLabel: links.papers.label,
  })
);

export const getStaticPaths = pages.papersPost.getStaticPaths(
  postGetStaticPaths(paths.papers)
);

export const priority = pages.papers.priority(0.5);
export const disallow = pages.papers.disallow(false);
export const changeFrequency = pages.papers.changeFrequency("daily");
export const getLastModificationDate = pages.papers.getLastModificationDate(
  async () => new Date()
);
