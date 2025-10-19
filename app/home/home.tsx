import { useEffect } from "react";
import { Banner } from "@egvelho/next-mui/components/banner";
import { ContentCards } from "@egvelho/next-mui/components/content-cards";
import { Meta } from "app/meta";
import { links, pages } from "app/url";
import { loadNetlifyIdentity } from "app/cms/load-netlify-identity";
import { InstagramSection } from "./instagram-section";
import { ContactFormSection } from "./contact-form-section";
import homeMetadata from "./home-metadata.json";
import bannerData from "./banner-data.json";
import cardsData from "./cards-data.json";

const cardsItems = cardsData.cards.map((item, key) => ({ ...item, key }));

export const Home = pages.index.page(() => {
  useEffect(() => {
    loadNetlifyIdentity();
  }, []);

  return (
    <>
      <Meta
        title={homeMetadata.title}
        description={homeMetadata.description}
        image={homeMetadata.image}
        keywords={homeMetadata.keywords}
        url={links.index.href}
      />
      <BannerSection />
      <CardsSection />
      <InstagramSection />
      <ContactFormSection />
    </>
  );
});

function BannerSection() {
  return (
    <section id="banner">
      <Banner
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        color={bannerData.color}
        image={bannerData.image}
        imageAlt={bannerData.imageAlt}
        imageWidth={bannerData.imageWidth}
        background={
          bannerData.backgroundImage
            ? `url(${bannerData.backgroundImage})`
            : bannerData.backgroundColor
        }
      />
      <style jsx global>{`
        #banner > .MuiBox-root {
          min-height: calc(100vh - 56px) !important;
          background-size: cover !important;
          background-position: center !important;
        }

        @media (max-width: 600px) {
          #banner img {
            width: 256px !important;
          }
        }
      `}</style>
    </section>
  );
}

function CardsSection() {
  return (
    <section id="content-cards">
      <ContentCards
        title={cardsData.title}
        subtitle={cardsData.subtitle}
        cards={cardsItems.filter(({ hide }) => !hide)}
      />
      <style jsx global>{`
        #content-cards h2 {
          font-weight: 600 !important;
          font-size: 3rem !important;
        }

        #content-cards
          .MuiCardContent-root
          > div:first-child
          > span:first-child {
          font-family: Roboto Mono !important;
          font-weight: 600 !important;
          font-size: 1rem !important;
        }

        @media (max-width: 600px) {
          #content-cards h2 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
