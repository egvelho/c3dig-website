import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";

export const postGetStaticPaths = (postsSource: string) => async () => {
  const postsPath = await collectionUtils.useCollectionFolder(postsSource, {
    createFolderIfNotExists: true,
  });
  const slugs = await collectionUtils.getSlugs(postsPath);

  return slugs.map((slug) => ({ slug }));
};
