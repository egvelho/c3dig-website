import { pages, client, links } from "app/url";
import paths from "app/cms/paths.json";
import { blog } from "app/blog/blog";
import { blogGetStaticProps } from "app/blog/blog-get-static-props";

export default blog({
  getPosts: client.getPapers,
  getPostsForTag: client.getPapersForTag,
  getPostHref(slug) {
    return links.papersPost.href({ slug });
  },
});

export const getStaticProps = pages.papers.getStaticProps(
  blogGetStaticProps({
    title: links.papers.longLabel,
    description: "Produção bibliográfica do C3Dig em periódicos.",
    image: "/images/artigos-publicados.jpg",
    pageHref: links.papers.href,
    pageHrefLabel: links.papers.label,
    postsApi: paths.papersApi,
    postsByTagApi: paths.papersByTagApi,
    postsSource: paths.papers,
  })
);

export const priority = pages.papers.priority(0.5);
export const disallow = pages.papers.disallow(false);
export const changeFrequency = pages.papers.changeFrequency("daily");
export const getLastModificationDate = pages.papers.getLastModificationDate(
  async () => new Date()
);
