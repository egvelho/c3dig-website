import React from "react";
import { MasonryGrid } from "@egvelho/next-mui/components/masonry-grid";
import { Page } from "@egvelho/next-mui/components/page";
import { SocialCard } from "@egvelho/next-mui/components/social-card";
import { TitleDescriptionInfo } from "@egvelho/next-mui/components/title-description-info";
import { pages, links } from "app/url";
import { Meta } from "app/meta";
import appConfig from "app.json";
import membersData from "./members-data.json";
import membersMetadata from "./members-metadata.json";

export const Members = pages.members.page(() => {
  return (
    <>
      <Meta
        title={membersMetadata.title}
        description={membersMetadata.description}
        image={membersMetadata.image}
        keywords={membersMetadata.keywords ?? []}
        url={links.members.href}
      />
      <Page
        breadcrumbs={[
          { key: "index", label: links.index.label, href: links.index.href },
          {
            key: "members",
            label: links.members.label,
            href: links.members.href,
          },
        ]}
        background={appConfig.dashColor}
        paper={false}
        backgroundIsDark={false}
        header={
          <span style={{ color: appConfig.primaryColor }}>
            <TitleDescriptionInfo
              title={membersMetadata.title}
              description={membersMetadata.description}
            />
          </span>
        }
      >
        <MasonryGrid xl={3} spacing={16}>
          {membersData.items.map((props, index) => (
            <SocialCard
              {...props}
              tags={(props.tags ?? []).map((tag) => ({ tag, key: tag }))}
              nameColor={appConfig.primaryColor}
              elevation={2}
              key={`scholar-card-${index}`}
            />
          ))}
        </MasonryGrid>
      </Page>
      <style jsx global>{`
        main > div:nth-child(2) {
          background-color: ${appConfig.backgroundColor};
        }

        .MuiCardContent-root .MuiListItemText-root .MuiListItemText-primary {
          font-family: Roboto Mono !important;
        }
      `}</style>
    </>
  );
});
