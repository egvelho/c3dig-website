import { pages, links } from "app/url";
import { postGetStaticPaths } from "app/blog/post-get-static-paths";
import { postGetStaticProps } from "app/blog/post-get-static-props";
import paths from "app/cms/paths.json";
import { post } from "app/blog/post";

export default post({
  getPostHref(slug) {
    return links.ebooksPost.href({ slug });
  },
});

export const getStaticProps = pages.ebooksPost.getStaticProps(
  postGetStaticProps({
    postsSource: paths.ebooks,
    blogHref: links.ebooks.href,
    blogHrefLabel: links.ebooks.label,
  })
);

export const getStaticPaths = pages.ebooksPost.getStaticPaths(
  postGetStaticPaths(paths.ebooks)
);

export const priority = pages.ebooks.priority(0.5);
export const disallow = pages.ebooks.disallow(false);
export const changeFrequency = pages.ebooks.changeFrequency("daily");
export const getLastModificationDate = pages.ebooks.getLastModificationDate(
  async () => new Date()
);
