import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import { pages } from "app/url";
import paths from "app/cms/paths.json";
import type { AboutContent } from "app/cms/about-page";

export { About as default } from "app/about/about";

export const getStaticProps = pages.about.getStaticProps(async () => {
  const contentPath = await collectionUtils.useCollectionFile(
    paths.aboutPageContent
  );

  const { data } = await collectionUtils.getCollectionFile<AboutContent>(
    contentPath
  );

  return {
    content: await collectionUtils.markdownToHtml(data.content ?? ""),
  };
});

export const priority = pages.about.priority(0.7);
export const disallow = pages.about.disallow(false);
export const changeFrequency = pages.about.changeFrequency("weekly");
export const getLastModificationDate = pages.about.getLastModificationDate(
  async () => {
    return new Date();
  }
);
