import { pages, links } from "app/url";
import { postGetStaticPaths } from "app/blog/post-get-static-paths";
import { postGetStaticProps } from "app/blog/post-get-static-props";
import paths from "app/cms/paths.json";
import { post } from "app/blog/post";

export default post({
  getPostHref(slug) {
    return links.worksPost.href({ slug });
  },
});

export const getStaticProps = pages.worksPost.getStaticProps(
  postGetStaticProps({
    postsSource: paths.works,
    blogHref: links.works.href,
    blogHrefLabel: links.works.label,
  })
);

export const getStaticPaths = pages.worksPost.getStaticPaths(
  postGetStaticPaths(paths.works)
);

export const priority = pages.works.priority(0.5);
export const disallow = pages.works.disallow(false);
export const changeFrequency = pages.works.changeFrequency("daily");
export const getLastModificationDate = pages.works.getLastModificationDate(
  async () => new Date()
);
