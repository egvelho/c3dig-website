import { Page } from "@egvelho/next-mui/components/page";
import { TitleDescriptionInfo } from "@egvelho/next-mui/components/title-description-info";
import { Markdown } from "@egvelho/next-mui/components/markdown";
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
import podcastsMetadata from "./podcasts-metadata.json";
import podcastsData from "./podcasts-data.json";

const texts = {
  podcastItemAriaLabel: "Expandir podcast",
};

export const Podcasts = pages.podcasts.page(({ podcastsContents }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const podcastsItems = podcastsData.items.map((item, index) => ({
    ...item,
    content: podcastsContents[index],
  }));

  return (
    <>
      <Meta
        title={podcastsMetadata.title}
        description={podcastsMetadata.description}
        image={podcastsMetadata.image}
        keywords={podcastsMetadata.keywords}
        url={links.podcasts.href}
      />
      <Page
        breadcrumbs={[
          { key: "index", label: links.index.label, href: links.index.href },
          {
            key: "podcasts",
            label: links.podcasts.label,
            href: links.podcasts.href,
          },
        ]}
        header={
          <span style={{ color: appConfig.primaryColor }}>
            <TitleDescriptionInfo
              title={podcastsMetadata.title}
              description={podcastsMetadata.description}
            />
          </span>
        }
        background={appConfig.dashColor}
      >
        <Box marginBottom={isDesktop ? 6 : 2}>
          <Paper elevation={2}>
            {podcastsItems.map(
              ({ title, content, episode, guests, image }, index) => (
                <Accordion key={`podcast-${index}`}>
                  <AccordionSummary
                    style={{
                      paddingLeft: theme.spacing(1.5),
                      paddingRight: theme.spacing(1.5),
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={texts.podcastItemAriaLabel}
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
                          {episode}
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
                          {guests}
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
