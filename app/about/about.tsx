import { Markdown } from "@egvelho/next-mui/components/markdown";
import { PostPage } from "@egvelho/next-mui/components/post-page";
import { pages, links } from "app/url";
import { Meta } from "app/meta";
import appConfig from "app.json";
import aboutMetadata from "./about-metadata.json";

const texts = {
  socialAnchorTitle: "Compartilhar no",
};

export const About = pages.about.page(({ content }) => {
  return (
    <>
      <Meta
        title={aboutMetadata.title as string}
        description={aboutMetadata.description as string}
        image={aboutMetadata.image}
        keywords={aboutMetadata.keywords ?? []}
        url={links.about.href}
      />
      <PostPage
        socialAnchorTitle={texts.socialAnchorTitle}
        breadcrumbs={[
          { key: "index", label: links.index.label, href: links.index.href },
          { key: "about", label: links.about.label, href: links.about.href },
        ]}
        title={aboutMetadata.title}
        description={aboutMetadata.description}
        background={appConfig.dashColor}
        titleColor={appConfig.primaryColor}
      >
        <article>
          <Markdown content={content} />
        </article>
      </PostPage>
      <style jsx global>{`
        main > div:nth-child(2) {
          background-color: ${appConfig.backgroundColor};
        }
      `}</style>
    </>
  );
});
