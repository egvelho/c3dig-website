import { MasonryGrid } from "@egvelho/next-mui/components/masonry-grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import appConfig from "app.json";
import instagramPosts from "./instagram-posts.json";

const texts = {
  title: "Instagram @c3dig",
};

const instagramLatestPosts = instagramPosts.posts.slice(0, 8);

export function InstagramSection() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <section id="instagram">
      <Box
        paddingY={isDesktop ? 16 : 8}
        paddingX={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{
          background: appConfig.dashColor,
        }}
      >
        <Box maxWidth={960} marginX="auto">
          <Box marginBottom={isDesktop ? 8 : 2}>
            <Typography
              align="center"
              variant={isDesktop ? "h3" : "h5"}
              component="h2"
              style={{
                color: appConfig.primaryColor,
                fontWeight: 600,
              }}
            >
              {texts.title}
            </Typography>
          </Box>
          <Box>
            <MasonryGrid
              spacing={isDesktop ? theme.spacing(2) : theme.spacing(0.5)}
              xs={2}
              sm={2}
              md={2}
              lg={4}
              xl={4}
            >
              {instagramLatestPosts.map(({ image, href }, index) => (
                <Box key={`home-instagram-item-${index}`}>
                  <a
                    href={href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <img
                      src={image}
                      style={{
                        width: "100%",
                        minWidth: isDesktop ? "192px" : "auto",
                        display: "block",
                        aspectRatio: "1",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                </Box>
              ))}
            </MasonryGrid>
          </Box>
        </Box>
      </Box>
    </section>
  );
}
