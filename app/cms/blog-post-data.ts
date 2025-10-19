import { collectionFolder } from "@egvelho/next-meta/cms/collection";

export function blogPostData({
  category,
  folder,
  label,
  labelSingular,
}: {
  category: string;
  folder: string;
  label: string;
  labelSingular: string;
}) {
  return collectionFolder({
    folder,
    label,
    labelSingular,
    slug: "{{title}}",
    sortableFields: ["publishDate"],
  }).fields((data) => ({
    title: data.string({
      label: "Título",
    }),
    description: data.string({
      label: "Descrição",
    }),
    image: data.image<"optional">({
      label: "Imagem",
      required: false,
    }),
    publishDate: data.datetime<"optional">({
      label: "Data de publicação",
      dateFormat: "MM/YYYY",
      timeFormat: "HH:mm",
      required: false,
    }),
    url: data.string<"optional">({
      label: "URL",
      required: false,
    }),
    tags: data.keywords({
      label: "Tags",
      min: 1,
      max: 5,
    }),
    authorName: data.string<"optional">({
      label: "Nome do autor",
      required: false,
    }),
    authorDescription: data.string<"optional">({
      label: "Descrição do autor",
      required: false,
    }),
    authorPicture: data.image<"optional">({
      label: "Foto do autor",
      required: false,
    }),
    content: data.markdown({
      label: "Conteúdo",
    }),
    category: data.hidden({
      label: "Categoria",
      defaultValue: category,
    }),
  }));
}
