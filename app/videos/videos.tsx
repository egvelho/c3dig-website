import { Page } from "@egvelho/next-mui/components/page";
import { TitleDescriptionInfo } from "@egvelho/next-mui/components/title-description-info";
import { Markdown } from "@egvelho/next-mui/components/markdown";
import { ClientRender } from "@egvelho/next-mui/components/client-render";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import appConfig from "app.json";
import { pages, links } from "app/url";
import { Meta } from "app/meta";
import videosMetadata from "./videos-metadata.json";
import videosData from "./videos-data.json";

const texts = {
  bookItemAriaLabel: "Expandir publicação",
};

export const Videos = pages.videos.page(({ videosContents }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const videosItems = videosData.items.map((item, index) => ({
    ...item,
    content: videosContents[index],
  }));

  return (
    <>
      <Meta
        title={videosMetadata.title}
        description={videosMetadata.description}
        image={videosMetadata.image}
        keywords={videosMetadata.keywords}
        url={links.videos.href}
      />
      <Page
        breadcrumbs={[
          { key: "index", label: links.index.label, href: links.index.href },
          { key: "videos", label: links.videos.label, href: links.videos.href },
        ]}
        header={
          <span style={{ color: appConfig.primaryColor }}>
            <TitleDescriptionInfo
              title={videosMetadata.title}
              description={videosMetadata.description}
            />
          </span>
        }
        background={appConfig.dashColor}
      >
        <Box marginBottom={isDesktop ? 6 : 2}>
          <Paper elevation={2}>
            {videosItems.map(
              ({ title, content, year, authors, image, video }, index) => (
                <Accordion key={`book-${index}`}>
                  <AccordionSummary
                    style={{
                      paddingLeft: theme.spacing(1.5),
                      paddingRight: theme.spacing(1.5),
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={texts.bookItemAriaLabel}
                  >
                    <Box display="flex" flexDirection="row">
                      <Box
                        paddingRight={1.5}
                        width="96px"
                        height="96px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <img
                          src={image}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box flex={1} paddingY={{ sm: 0, md: 1 }}>
                        <Typography
                          variant="caption"
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {year}
                        </Typography>
                        <Typography style={{ fontFamily: "Roboto Mono" }}>
                          {title}
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {authors}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      paddingLeft: theme.spacing(1.5),
                      paddingRight: theme.spacing(1.5),
                    }}
                  >
                    <Box
                      paddingRight={{ sm: 0, md: 8 }}
                      paddingBottom={{ sm: 0, md: 2 }}
                    >
                      <Markdown content={content} />
                      <Box>
                        <ClientRender>
                          <iframe
                            width={isDesktop ? "560" : "100%"}
                            height="315"
                            src={video
                              .replace("watch?v=", "embed/")
                              .replace("youtu.be/", "youtube.com/embed/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </ClientRender>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              )
            )}
          </Paper>
        </Box>
        <style jsx global>{`
          main > div:nth-child(2) {
            background-color: ${appConfig.backgroundColor};
          }
        `}</style>
      </Page>
    </>
  );
});
