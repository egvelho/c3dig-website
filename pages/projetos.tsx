import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import { pages } from "app/url";
import paths from "app/cms/paths.json";
import type { ResearchPage } from "app/cms/research-page";

export { Research as default } from "app/research/research";

export const getStaticProps = pages.research.getStaticProps(async () => {
  const contentPath = await collectionUtils.useCollectionFile(
    paths.researchPageData
  );

  const { data } = await collectionUtils.getCollectionFile<ResearchPage>(
    contentPath
  );

  return {
    researchContents: await Promise.all(
      data.items.map(({ content }) =>
        collectionUtils.markdownToHtml(content ?? "")
      )
    ),
  };
});

export const priority = pages.research.priority(0.8);
export const disallow = pages.research.disallow(false);
export const changeFrequency = pages.research.changeFrequency("weekly");
export const getLastModificationDate = pages.research.getLastModificationDate(
  async () => new Date()
);
