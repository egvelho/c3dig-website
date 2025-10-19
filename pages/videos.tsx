import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import { pages } from "app/url";
import paths from "app/cms/paths.json";
import type { VideosPage } from "app/cms/videos-page";

export { Videos as default } from "app/videos/videos";

export const getStaticProps = pages.videos.getStaticProps(async () => {
  const contentPath = await collectionUtils.useCollectionFile(
    paths.videosPageData
  );

  const { data } = await collectionUtils.getCollectionFile<VideosPage>(
    contentPath
  );

  return {
    videosContents: await Promise.all(
      data.items.map(({ content }) =>
        collectionUtils.markdownToHtml(content ?? "")
      )
    ),
  };
});

export const priority = pages.videos.priority(0.8);
export const disallow = pages.videos.disallow(false);
export const changeFrequency = pages.videos.changeFrequency("weekly");
export const getLastModificationDate = pages.videos.getLastModificationDate(
  async () => new Date()
);
