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
import eventsData from "./events-data.json";
import eventsMetadata from "./events-metadata.json";

const texts = {
  eventsItemAriaLabel: "Expandir eventos",
};

export const Events = pages.events.page(({ eventsContents }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const eventsItems = eventsData.items.map((item, index) => ({
    ...item,
    content: eventsContents[index],
  }));

  return (
    <>
      <Meta
        title={eventsMetadata.title}
        description={eventsMetadata.description}
        image={eventsMetadata.image}
        keywords={eventsMetadata.keywords}
        url={links.events.href}
      />
      <Page
        breadcrumbs={[
          { key: "index", label: links.index.label, href: links.index.href },
          {
            key: "events",
            label: links.events.label,
            href: links.events.href,
          },
        ]}
        header={
          <span style={{ color: appConfig.primaryColor }}>
            <TitleDescriptionInfo
              title={eventsMetadata.title}
              description={eventsMetadata.description}
            />
          </span>
        }
        background={appConfig.dashColor}
      >
        <Box marginBottom={isDesktop ? 6 : 2}>
          <Paper elevation={4}>
            {eventsItems.map(({ title, content, date }, index) => (
              <Accordion key={`historic-period-${index}`}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={texts.eventsItemAriaLabel}
                >
                  <Box
                    paddingLeft={{ sm: 0, md: 1 }}
                    paddingY={{ sm: 0, md: 1 }}
                  >
                    <Typography
                      variant="caption"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {date}
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Roboto Mono",
                      }}
                    >
                      {title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    paddingLeft={{ sm: 0, md: 1 }}
                    paddingRight={{ sm: 0, md: 8 }}
                    paddingBottom={{ sm: 0, md: 2 }}
                  >
                    <Markdown content={content} />
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Box>
      </Page>
      <style jsx global>{`
        main > div:nth-child(2) {
          background-color: ${appConfig.backgroundColor};
        }
      `}</style>
    </>
  );
});
