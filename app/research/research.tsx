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
import Chip from "@material-ui/core/Chip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppIcon from "@material-ui/icons/GetApp";
import appConfig from "app.json";
import { pages, links } from "app/url";
import { Meta } from "app/meta";
import researchData from "./research-data.json";
import researchMetadata from "./research-metadata.json";

const texts = {
  researchItemAriaLabel: "Expandir período de pesquisa",
};

export const Research = pages.research.page(({ researchContents }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const researchItems = researchData.items.map((item, index) => ({
    ...item,
    content: researchContents[index],
  }));

  return (
    <>
      <Meta
        title={researchMetadata.title}
        description={researchMetadata.description}
        image={researchMetadata.image}
        keywords={researchMetadata.keywords}
        url={links.research.href}
      />
      <Page
        breadcrumbs={[
          { key: "index", label: links.index.label, href: links.index.href },
          {
            key: "research",
            label: links.research.label,
            href: links.research.href,
          },
        ]}
        header={
          <span style={{ color: appConfig.primaryColor }}>
            <TitleDescriptionInfo
              title={researchMetadata.title}
              description={researchMetadata.description}
            />
          </span>
        }
        background={appConfig.dashColor}
      >
        <Box marginBottom={isDesktop ? 6 : 2}>
          <Paper elevation={4}>
            {researchItems.map(({ title, content, period, files }, index) => (
              <Accordion key={`historic-period-${index}`}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={texts.researchItemAriaLabel}
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
                      {period}
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
                    {files && files.length > 0 && (
                      <Box flexWrap="wrap" display="flex" marginTop={2}>
                        {(files as { title: string; file: string }[]).map(
                          ({ title, file }, index) => (
                            <Box
                              key={`historic-period-file-${index}`}
                              marginRight={0.5}
                              marginBottom={0.5}
                            >
                              <Chip
                                color="secondary"
                                component="a"
                                download={title}
                                href={file}
                                label={title}
                                icon={<GetAppIcon />}
                                style={{
                                  cursor: "pointer",
                                }}
                              />
                            </Box>
                          )
                        )}
                      </Box>
                    )}
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
