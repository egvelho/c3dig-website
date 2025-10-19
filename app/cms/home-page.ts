import {
  collectionFiles,
  collectionFile,
} from "@egvelho/next-meta/cms/collection";
import { pageMetadata } from "app/cms/page-metadata";

const homeMetadata = pageMetadata({
  file: "app/home/home-metadata.json",
});

const cardsData = collectionFile({
  file: "app/home/cards-data.json",
  label: "Cartões",
}).fields((data) => {
  return {
    title: data.string({
      label: "Título",
    }),
    subtitle: data.text<"optional">({
      label: "Subtítulo",
      required: false,
    }),
    cards: data
      .list({
        label: "Cartões",
        labelSingular: "Cartão",
        summary: "{{fields.title}}",
      })
      .fields({
        title: data.string({
          label: "Título",
        }),
        content: data.text({
          label: "Conteúdo",
        }),
        href: data.string({
          label: "Link",
        }),
        image: data.image({
          label: "Imagem",
        }),
        hide: data.boolean({
          label: "Ocultar",
          defaultValue: false,
        }),
      }),
  };
});

export const homePage = collectionFiles({
  label: "Home",
  collections: [homeMetadata, cardsData],
});
