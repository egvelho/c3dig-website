import { PostPage } from "@egvelho/next-mui/components/post-page";
import { Markdown } from "@egvelho/next-mui/components/markdown";
import { ClientRender } from "@egvelho/next-mui/components/client-render";
import { truncateString } from "@egvelho/next-mui/utils/truncate-string";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import appConfig from "app.json";
import { links, BlogPostPage } from "app/url";
import { Meta } from "app/meta";

const texts = {
  socialAnchorTitle: "Compartilhar no",
  urlLabel: "Acesso em: ",
};

export type PostProps = BlogPostPage;

export type GetPostHref = (slug: string) => string;

export type PostHOCProps = {
  getPostHref: GetPostHref;
};

export const post = (hocProps: PostHOCProps) => (props: PostProps) =>
  <Post {...props} {...hocProps} />;

export function Post({
  title,
  description,
  image,
  publishDate,
  tags,
  authorName,
  authorDescription,
  authorPicture,
  content,
  blogHref,
  blogHrefLabel,
  getPostHref,
  slug,
  url,
}: PostProps & PostHOCProps) {
  const publishDateTime =
    (publishDate !== undefined && new Date(publishDate)) || undefined;

  return (
    <>
      <Meta
        title={title}
        description={description}
        image={image ?? "/android-chrome-512x512.png"}
        keywords={tags}
        url={getPostHref(slug)}
      />
      <PostPage
        socialAnchorTitle={texts.socialAnchorTitle}
        titleColor={appConfig.primaryColor}
        title={title}
        description={description}
        background={appConfig.dashColor}
        authorName={authorName}
        authorDescription={authorDescription}
        authorPicture={authorPicture}
        date={publishDateTime}
        dateText={
          <ClientRender>
            {`Em ${publishDateTime?.toLocaleDateString()}`}
          </ClientRender>
        }
        tags={tags.map((tag) => ({
          key: tag,
          tag,
          href: "",
        }))}
        breadcrumbs={[
          { key: "index", label: links.index.label, href: links.index.href },
          { key: "blog", label: blogHrefLabel, href: blogHref },
          {
            key: "post",
            label: truncateString(title, 12),
            href: getPostHref(slug),
          },
        ]}
        facebook
        linkedIn
        twitter
        whatsApp
      >
        <article>
          <Markdown content={content} />
          {url && (
            <Box
              marginTop={4}
              style={{
                wordBreak: "break-all",
              }}
            >
              {texts.urlLabel}
              <Link
                href={url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                style={{
                  textDecoration: "underline",
                }}
              >
                {url}
              </Link>
            </Box>
          )}
        </article>
      </PostPage>
      <style jsx global>{`
        main > div:nth-child(2) {
          background-color: ${appConfig.backgroundColor};
        }

        main > div:nth-child(2) > div > div > div > div > div:nth-child(2) {
          display: none !important;
        }
      `}</style>
    </>
  );
}
