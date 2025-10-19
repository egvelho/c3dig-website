import { pages, client, links } from "app/url";
import paths from "app/cms/paths.json";
import { blog } from "app/blog/blog";
import { blogGetStaticProps } from "app/blog/blog-get-static-props";

export default blog({
  getPosts: client.getEbooks,
  getPostsForTag: client.getEbooksForTag,
  getPostHref(slug) {
    return links.ebooksPost.href({ slug });
  },
});

export const getStaticProps = pages.ebooks.getStaticProps(
  blogGetStaticProps({
    title: links.ebooks.longLabel,
    description: "Publicações do C3Dig.",
    image: "/images/livros-ebooks.jpg",
    pageHref: links.ebooks.href,
    pageHrefLabel: links.ebooks.label,
    postsApi: paths.ebooksApi,
    postsByTagApi: paths.ebooksByTagApi,
    postsSource: paths.ebooks,
  })
);

export const priority = pages.ebooks.priority(0.5);
export const disallow = pages.ebooks.disallow(false);
export const changeFrequency = pages.ebooks.changeFrequency("daily");
export const getLastModificationDate = pages.ebooks.getLastModificationDate(
  async () => new Date()
);
