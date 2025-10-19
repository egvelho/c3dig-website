import {
  collectionFiles,
  collectionFile,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";
import { pageMetadata } from "app/cms/page-metadata";

export type ResearchPage = GetCollectionType<typeof researchData>;

export type ResearchContents = {
  researchContents: GetCollectionType<
    typeof researchData
  >["items"][0]["content"][];
};

const researchMetadata = pageMetadata({
  file: "app/research/research-metadata.json",
});

const researchData = collectionFile({
  file: "app/research/research-data.json",
  label: "Projetos de pesquisa",
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
      period: data.string({
        label: "Período",
      }),
      content: data.markdown({
        label: "Conteúdo",
      }),
      files: data
        .list({
          label: "Documentos",
          labelSingular: "Documento",
          summary: "Item",
        })
        .fields({
          title: data.string({
            label: "Título",
          }),
          file: data.file({
            label: "Arquivo",
          }),
        }),
    }),
}));

export const researchPage = collectionFiles({
  label: "Projetos de pesquisa",
  collections: [researchMetadata, researchData],
});
