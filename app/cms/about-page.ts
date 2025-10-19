import {
  collectionFiles,
  collectionFile,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";
import { pageMetadata } from "app/cms/page-metadata";

export type AboutContent = {
  content: GetCollectionType<typeof aboutContent>["content"];
};

const aboutMetadata = pageMetadata({
  file: "app/about/about-metadata.json",
});

const aboutContent = collectionFile({
  file: "app/about/about-content.json",
  label: "Sobre",
}).fields((data) => ({
  content: data.markdown({
    label: "Conteúdo",
  }),
}));

export const aboutPage = collectionFiles({
  label: "Sobre",
  collections: [aboutMetadata, aboutContent],
});
