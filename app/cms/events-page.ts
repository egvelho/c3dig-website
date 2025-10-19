import {
  collectionFiles,
  collectionFile,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";
import { pageMetadata } from "app/cms/page-metadata";

export type EventsPage = GetCollectionType<typeof eventsData>;

export type EventsContents = {
  eventsContents: GetCollectionType<typeof eventsData>["items"][0]["content"][];
};

const eventsMetadata = pageMetadata({
  file: "app/events/events-metadata.json",
});

const eventsData = collectionFile({
  file: "app/events/events-data.json",
  label: "Eventos",
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
      date: data.string({
        label: "Data do evento",
      }),
      content: data.markdown({
        label: "Descrição",
      }),
    }),
}));

export const eventsPage = collectionFiles({
  label: "Eventos",
  collections: [eventsMetadata, eventsData],
});
