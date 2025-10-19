import { useState } from "react";
import { slugify } from "@egvelho/next-meta/utils/slugify";
import { Blog as MuiBlog } from "@egvelho/next-mui/components/blog";
import { ClientRender } from "@egvelho/next-mui/components/client-render";
import { links, BlogPage, BlogPost, client } from "app/url";
import appConfig from "app.json";
import { Meta } from "app/meta";
import { useContext } from "app/context";

const texts = {
  noOptionsText: "Sem resultados",
  noResultsText: "Nenhum resultado foi encontrado",
  noResultsDescription:
    "Esta página não possui conteúdo. Por favor, tente outra busca.",
  placeholder: "Buscar publicações",
};

export type BlogProps = BlogPage;

export type BlogHOCProps = {
  getPosts: GetPosts;
  getPostsForTag: GetPostsForTag;
  getPostHref: GetPostHref;
};

export type GetPosts = typeof client[
  | "getEbooks"
  | "getPapers"
  | "getWorks"
  | "getReports"];

export type GetPostsForTag = typeof client[
  | "getEbooksForTag"
  | "getPapersForTag"
  | "getWorksForTag"
  | "getReportsForTag"];

export type GetPostHref = (slug: string) => string;

export const blog = (hocProps: BlogHOCProps) => (props: BlogProps) =>
  <Blog {...props} {...hocProps} />;

export function Blog({
  getPosts,
  getPostsForTag,
  getPostHref,
  ...props
}: BlogProps & BlogHOCProps) {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState(props.posts);
  const [postsLength, setPostsLength] = useState(props.postsLength);
  const [selectedTags, setSelectedTags] = useState(
    props.initialTag ? [props.initialTag] : []
  );
  const [tags, setTags] = useState(props.tags);

  const {
    context: { loading },
  } = useContext();

  return (
    <>
      <Meta
        title={props.title}
        description={props.description}
        image={props.image}
        keywords={props.tags}
        url={links.index.href}
      />
      <MuiBlog
        noOptionsText={texts.noOptionsText}
        noResultsText={texts.noResultsText}
        noResultsDescription={texts.noResultsDescription}
        placeholder={texts.placeholder}
        title={props.title}
        titleColor={appConfig.primaryColor}
        background={appConfig.dashColor}
        breadcrumbs={[
          { key: "home", href: links.index.href, label: links.index.label },
          { key: "blog", href: props.pageHref, label: props.pageHrefLabel },
        ]}
        onRequestMorePosts={async () => {
          const nextPage = page + 1;
          const maybeNextPosts = await getPosts({
            page: nextPage.toString(),
          });

          if (maybeNextPosts.data) {
            setPage(nextPage);
            setPosts(
              posts.concat(
                maybeNextPosts.data.map(
                  ({ slug, data: { content, ...data } }) => ({
                    slug,
                    ...data,
                  })
                )
              )
            );
          }
        }}
        hasMorePosts={posts.length < postsLength}
        posts={posts.map((post) => mapPostToItem(post, getPostHref))}
        loading={loading}
        disabled={loading}
        onChange={async (nextSelectedTags) => {
          if (props.initialTag && nextSelectedTags.length === 0) {
            return;
          }

          if (
            props.initialTag &&
            nextSelectedTags.length > 0 &&
            nextSelectedTags[0] !== props.initialTag
          ) {
            return;
          }

          setSelectedTags(nextSelectedTags);

          if (
            nextSelectedTags.length === 0 ||
            (props.initialTag && nextSelectedTags.length === 1)
          ) {
            setPage(0);
            setPostsLength(props.postsLength);
            setPosts(props.posts);
            setTags(props.tags);
          } else if (
            props.initialTag === undefined &&
            nextSelectedTags.length === 1
          ) {
            const [tag] = nextSelectedTags;
            const maybeNextPosts = await getPostsForTag({
              tag: slugify(tag),
            });

            if (maybeNextPosts.data) {
              const nextPosts = maybeNextPosts.data.map((request) =>
                mapRequestToPost(request)
              );
              const nextTags = mapPostsToTags(nextPosts);

              setPosts(nextPosts);
              setPostsLength(nextPosts.length);
              setTags(nextTags);
            }
          } else {
            const nextPosts = posts.filter(({ tags }) =>
              nextSelectedTags.every((tag) => tags.includes(tag))
            );
            const nextTags = mapPostsToTags(nextPosts);

            setPosts(nextPosts);
            setPostsLength(nextPosts.length);
            setTags(nextTags);
          }
        }}
        options={tags}
        value={selectedTags}
      />
      <style jsx global>{`
        .MuiCardContent-root .MuiTypography-h6 {
          font-family: Roboto Mono !important;
          font-weight: 600 !important;
          font-size: 1rem !important;
        }
      `}</style>
    </>
  );
}

function mapPostToItem(post: BlogPage["posts"][0], getPostHref: GetPostHref) {
  const publishDateTime =
    (post.publishDate && new Date(post.publishDate)) || undefined;

  return {
    title: post.title,
    subtitle: post.description,
    authorName: post.authorName,
    authorPicture: post.authorPicture,
    date: publishDateTime,
    dateText: (
      <ClientRender>
        {`Em ${publishDateTime?.toLocaleDateString()}`}
      </ClientRender>
    ),
    image: post.image,
    tags: post.tags.map((tag, index) => ({ tag, key: `${tag}-${index}` })),
    key: post.slug,
    href: getPostHref(post.slug),
  };
}

function mapRequestToPost({
  slug,
  data: { content, ...data },
}: {
  slug: string;
  data: BlogPost;
}): BlogPage["posts"][0] {
  return {
    slug,
    ...data,
  };
}

function mapPostsToTags(posts: BlogPage["posts"]) {
  return [...new Set(posts.map(({ tags }) => tags).flat())];
}
