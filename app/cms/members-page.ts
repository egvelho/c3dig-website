import {
  collectionFiles,
  collectionFile,
} from "@egvelho/next-meta/cms/collection";
import { pageMetadata } from "app/cms/page-metadata";

const membersMetadata = pageMetadata({
  file: "app/members/members-metadata.json",
});

const membersData = collectionFile({
  file: "app/members/members-data.json",
  label: "Integrantes",
}).fields((data) => ({
  items: data
    .list({
      label: "Items",
      labelSingular: "Item",
      summary: "Item",
    })
    .fields({
      name: data.string({
        label: "Nome",
      }),
      description: data.string({
        label: "Titulação / Profissão",
      }),
      picture: data.image({
        label: "Foto",
      }),
      tags: data.keywords({
        label: "Palavras-chave",
        min: 0,
        max: 5,
      }),
      about: data.text({
        label: "Minicurrículo",
      }),
      email: data.text<"optional">({
        label: "Email",
        required: false,
      }),
      lattes: data.text<"optional">({
        label: "Lattes",
        required: false,
      }),
      facebook: data.text<"optional">({
        label: "Facebook",
        required: false,
      }),
      instagram: data.text<"optional">({
        label: "Instagram",
        required: false,
      }),
      linkedIn: data.text<"optional">({
        label: "LinkedIn",
        required: false,
      }),
      twitter: data.text<"optional">({
        label: "Twitter",
        required: false,
      }),
    }),
}));

export const membersPage = collectionFiles({
  label: "Integrantes",
  collections: [membersMetadata, membersData],
});
