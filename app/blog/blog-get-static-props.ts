import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import { env } from "app/env";
import { BlogPost, BlogPage } from "app/url";

export interface BlogGetStaticProps {
  title: string;
  description: string;
  image: string;
  postsSource: string;
  postsApi: string;
  postsByTagApi: string;
  pageHref: string;
  pageHrefLabel: string;
}

export const blogGetStaticProps =
  ({
    title,
    description,
    image,
    postsApi,
    postsByTagApi,
    postsSource,
    pageHref,
    pageHrefLabel,
  }: BlogGetStaticProps) =>
  async (): Promise<BlogPage> => {
    const posts = await getAllPosts(postsSource);
    const tags = [...new Set(posts.map(({ data: { tags } }) => tags).flat())];
    const postsChunks = await collectionUtils.chunkItems(
      posts,
      env().pagination
    );
    const postsApiPath = await collectionUtils.useCollectionFolder(postsApi, {
      createFolderIfNotExists: true,
    });

    await collectionUtils.createFolderIfNotExists(postsByTagApi);

    await Promise.all(
      tags.map(async (tag) => {
        const slugifiedTag = collectionUtils.slugify(tag);

        const tagPath = await collectionUtils.useCollectionFile(
          `${postsByTagApi}/${slugifiedTag}.json`,
          { doNotCheckIfExists: true }
        );

        const postsForTag = posts.filter(({ data: { tags } }) =>
          tags.map((tag) => collectionUtils.slugify(tag)).includes(slugifiedTag)
        );

        await collectionUtils.writeItemsToFile(tagPath, postsForTag);
      })
    );

    await collectionUtils.deleteFilesThenRecreateFolder(postsApiPath);
    await collectionUtils.writeChunksToFolder(postsApiPath, postsChunks);

    return {
      title,
      description,
      image,
      pageHref,
      pageHrefLabel,
      tags,
      postsLength: posts.length,
      posts: posts
        .slice(0, env().pagination)
        .map(({ data: { content, ...data }, slug }) => ({
          ...data,
          slug,
        })),
    };
  };

async function getAllPosts(postsSource: string) {
  const postsPath = await collectionUtils.useCollectionFolder(postsSource, {
    createFolderIfNotExists: true,
  });
  const posts = await collectionUtils.getCollectionFolder<BlogPost>(postsPath);
  const sortByMostRecentPosts = collectionUtils.sortByMostRecent<BlogPost>(
    ({ data: { publishDate } }) => new Date(publishDate ?? 0)
  );

  return posts.sort(sortByMostRecentPosts);
}
