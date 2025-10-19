import {
  collectionFiles,
  collectionFile,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";
import { pageMetadata } from "app/cms/page-metadata";

export type PodcastsPage = GetCollectionType<typeof podcastsData>;

export type PodcastsContents = {
  podcastsContents: GetCollectionType<
    typeof podcastsData
  >["items"][0]["content"][];
};

const podcastsMetadata = pageMetadata({
  file: "app/podcasts/podcasts-metadata.json",
});

const podcastsData = collectionFile({
  file: "app/podcasts/podcasts-data.json",
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
        label: "Título do episódio",
      }),
      episode: data.string({
        label: "Nº do episódio",
      }),
      guests: data.text({
        label: "Participantes",
      }),
      image: data.image({
        label: "Imagem de divulgação",
      }),
      content: data.markdown({
        label: "Descrição do episódio",
      }),
    }),
}));

export const podcastsPage = collectionFiles({
  label: "Podcast C3dig",
  collections: [podcastsMetadata, podcastsData],
});
