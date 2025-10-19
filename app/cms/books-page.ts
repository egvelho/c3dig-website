import {
  collectionFiles,
  collectionFile,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";
import { pageMetadata } from "app/cms/page-metadata";

export type BooksPage = GetCollectionType<typeof booksData>;

export type BooksContents = {
  booksContents: GetCollectionType<typeof booksData>["items"][0]["content"][];
};

const booksMetadata = pageMetadata({
  file: "app/books/books-metadata.json",
});

const booksData = collectionFile({
  file: "app/books/books-data.json",
  label: "Leituras recomendadas",
}).fields((data) => ({
  items: data
    .list({
      label: "Items",
      labelSingular: "Item",
      summary: "Item",
    })
    .fields({
      title: data.string({
        label: "Título",
      }),
      year: data.string({
        label: "Ano de publicação",
      }),
      authors: data.text({
        label: "Autores",
      }),
      image: data.image({
        label: "Capa do livro",
      }),
      content: data.markdown({
        label: "Conteúdo",
      }),
    }),
}));

export const booksPage = collectionFiles({
  label: "Leituras recomendadas",
  collections: [booksMetadata, booksData],
});
