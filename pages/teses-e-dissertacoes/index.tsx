import { pages, client, links } from "app/url";
import paths from "app/cms/paths.json";
import { blog } from "app/blog/blog";
import { blogGetStaticProps } from "app/blog/blog-get-static-props";

export default blog({
  getPosts: client.getWorks,
  getPostsForTag: client.getWorksForTag,
  getPostHref(slug) {
    return links.worksPost.href({ slug });
  },
});

export const getStaticProps = pages.works.getStaticProps(
  blogGetStaticProps({
    title: links.works.longLabel,
    description:
      "Teses e dissertações produzidas pelos pesquisadores do C3Dig.",
    image: "/images/teses-dissertacoes.jpg",
    pageHref: links.works.href,
    pageHrefLabel: links.works.label,
    postsApi: paths.worksApi,
    postsByTagApi: paths.worksByTagApi,
    postsSource: paths.works,
  })
);

export const priority = pages.works.priority(0.5);
export const disallow = pages.works.disallow(false);
export const changeFrequency = pages.works.changeFrequency("daily");
export const getLastModificationDate = pages.works.getLastModificationDate(
  async () => new Date()
);
