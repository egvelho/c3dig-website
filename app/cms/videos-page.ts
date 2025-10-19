import {
  collectionFiles,
  collectionFile,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";
import { pageMetadata } from "app/cms/page-metadata";

export type VideosPage = GetCollectionType<typeof videosData>;

export type VideosContents = {
  videosContents: GetCollectionType<typeof videosData>["items"][0]["content"][];
};

const videosMetadata = pageMetadata({
  file: "app/videos/videos-metadata.json",
});

const videosData = collectionFile({
  file: "app/videos/videos-data.json",
  label: "Vídeos",
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
        label: "Ano do lançamento",
      }),
      authors: data.text({
        label: "Ministrante/participantes",
      }),
      video: data.string({
        label: "Link para o vídeo (YouTube)",
      }),
      image: data.image({
        label: "Miniatura",
      }),
      content: data.markdown({
        label: "Descrição",
      }),
    }),
}));

export const videosPage = collectionFiles({
  label: "Vídeos",
  collections: [videosMetadata, videosData],
});
