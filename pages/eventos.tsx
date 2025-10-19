import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import { pages } from "app/url";
import paths from "app/cms/paths.json";
import type { EventsPage } from "app/cms/events-page";

export { Events as default } from "app/events/events";

export const getStaticProps = pages.events.getStaticProps(async () => {
  const contentPath = await collectionUtils.useCollectionFile(
    paths.eventsPageData
  );

  const { data } = await collectionUtils.getCollectionFile<EventsPage>(
    contentPath
  );

  return {
    eventsContents: await Promise.all(
      data.items.map(({ content }) =>
        collectionUtils.markdownToHtml(content ?? "")
      )
    ),
  };
});

export const priority = pages.events.priority(0.8);
export const disallow = pages.events.disallow(false);
export const changeFrequency = pages.events.changeFrequency("weekly");
export const getLastModificationDate = pages.events.getLastModificationDate(
  async () => new Date()
);
