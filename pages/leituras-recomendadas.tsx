import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import { pages } from "app/url";
import paths from "app/cms/paths.json";
import type { BooksPage } from "app/cms/books-page";

export { Books as default } from "app/books/books";

export const getStaticProps = pages.books.getStaticProps(async () => {
  const contentPath = await collectionUtils.useCollectionFile(
    paths.booksPageData
  );

  const { data } = await collectionUtils.getCollectionFile<BooksPage>(
    contentPath
  );

  return {
    booksContents: await Promise.all(
      data.items.map(({ content }) =>
        collectionUtils.markdownToHtml(content ?? "")
      )
    ),
  };
});

export const priority = pages.books.priority(0.8);
export const disallow = pages.books.disallow(false);
export const changeFrequency = pages.books.changeFrequency("weekly");
export const getLastModificationDate = pages.books.getLastModificationDate(
  async () => new Date()
);
