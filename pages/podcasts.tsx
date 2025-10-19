import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import { pages } from "app/url";
import paths from "app/cms/paths.json";
import type { PodcastsPage } from "app/cms/podcasts-page";

export { Podcasts as default } from "app/podcasts/podcasts";

export const getStaticProps = pages.podcasts.getStaticProps(async () => {
  const contentPath = await collectionUtils.useCollectionFile(
    paths.podcastsPageData
  );

  const { data } = await collectionUtils.getCollectionFile<PodcastsPage>(
    contentPath
  );

  return {
    podcastsContents: await Promise.all(
      data.items.map(({ content }) =>
        collectionUtils.markdownToHtml(content ?? "")
      )
    ),
  };
});

export const priority = pages.podcasts.priority(0.8);
export const disallow = pages.podcasts.disallow(false);
export const changeFrequency = pages.podcasts.changeFrequency("weekly");
export const getLastModificationDate = pages.podcasts.getLastModificationDate(
  async () => new Date()
);
