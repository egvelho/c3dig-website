import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import type { BlogPost, BlogPostQuery, BlogPostPage } from "app/url";

export const postGetStaticProps =
  ({
    postsSource,
    blogHref,
    blogHrefLabel,
  }: {
    postsSource: string;
    blogHref: string;
    blogHrefLabel: string;
  }) =>
  async (query: BlogPostQuery): Promise<BlogPostPage> => {
    const postPath = await collectionUtils.useCollectionFile(
      `${postsSource}/${query.slug}.json`
    );

    const { data, slug } = await collectionUtils.getCollectionFile<BlogPost>(
      postPath
    );

    return {
      ...data,
      slug,
      content: await collectionUtils.markdownToHtml(data.content ?? ""),
      blogHref,
      blogHrefLabel,
    };
  };
