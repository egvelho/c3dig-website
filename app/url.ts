import { link } from "@egvelho/next-meta/url/link";
import { endpoint } from "@egvelho/next-meta/url/endpoint";
import { getAxiosClient } from "@egvelho/next-meta/url/get-axios-client";
import { getPages } from "@egvelho/next-meta/url/get-pages";
import { icons } from "@egvelho/next-mui/icons";
import type { MetaProps } from "app/meta";
import type { EbooksPage } from "app/cms/ebooks-page";
import type { PapersPage } from "app/cms/papers-page";
import type { WorksPage } from "app/cms/works-page";
import type { ReportsPage } from "app/cms/reports-page";
import type { AboutContent } from "app/cms/about-page";
import type { BooksContents } from "app/cms/books-page";
import type { PodcastsContents } from "app/cms/podcasts-page";
import type { EventsContents } from "app/cms/events-page";
import type { VideosContents } from "app/cms/videos-page";
import type { ResearchContents } from "app/cms/research-page";
import type { Data } from "@egvelho/next-meta/cms/collection-types";
import { getContext } from "app/context";

export type { ExtractPageProps } from "@egvelho/next-meta/url/get-pages";
export type { ExtractClientResponse } from "@egvelho/next-meta/url/get-axios-client";

export interface WithSlug {
  slug: string;
}

export type BlogPost = EbooksPage | PapersPage | WorksPage | ReportsPage;

export type BlogPage = {
  title: string;
  description: string;
  image: string;
  postsLength: number;
  posts: (Omit<BlogPost, "content"> & WithSlug)[];
  tags: string[];
  initialTag?: string;
  pageHref: string;
  pageHrefLabel: string;
};

export type BlogTagQuery = { tag: string };

export type BlogPostPage = BlogPost &
  WithSlug & {
    blogHrefLabel: string;
    blogHref: string;
  };

export type BlogPostQuery = { slug: string };

function blogLink(url: string, label: string, longLabel: string) {
  return link<BlogPage>(url, icons.RssFeed, label, longLabel);
}

function blogPostLink(url: string) {
  return link<BlogPostPage, BlogPostQuery, "withQuery">(
    ({ slug }) => `${url}${slug}`,
    icons.Comment,
    "Publicação"
  );
}

function blogEndpoint(url: string) {
  return endpoint<{ page: string }, Data<BlogPost>[]>(
    "GET",
    `/static-api/${url}/[page].json`
  );
}

function blogTagEndpoint(url: string) {
  return endpoint<{ tag: string }, Data<BlogPost>[]>(
    "GET",
    `/static-api/${url}-by-tag/[tag].json`
  );
}

export const links = {
  cms: link("/cms", icons.SupervisedUserCircle, "CMS"),
  index: link("/", icons.Home, "Home"),
  ebooks: blogLink("/livros", "Livros", "Livros e ebooks"),
  ebooksPost: blogPostLink("/livros/"),
  papers: blogLink("/artigos", "Artigos", "Artigos científicos"),
  papersPost: blogPostLink("/artigos/"),
  reports: blogLink("/reports", "Reports", "Reports"),
  reportsPost: blogPostLink("/reports/"),
  works: blogLink(
    "/teses-e-dissertacoes",
    "Teses e dissertações",
    "Teses e dissertações"
  ),
  worksPost: blogPostLink("/teses-e-dissertacoes/"),
  contact: link("/#contato", icons.Email, "Contato", "Realizar contato"),
  about: link<AboutContent>("/sobre", icons.ZoomIn, "Sobre", "Sobre o grupo"),
  books: link<BooksContents>(
    "/leituras-recomendadas",
    icons.MenuBook,
    "Leituras",
    "Leituras recomendadas"
  ),
  podcasts: link<PodcastsContents>(
    "/podcasts",
    icons.Podcasts,
    "Podcast",
    "Podcast C3dig"
  ),
  videos: link<VideosContents>("/videos", icons.VideoLibrary, "Vídeos"),
  events: link<EventsContents>("/eventos", icons.EventAvailable, "Eventos"),
  research: link<ResearchContents>(
    "/projetos",
    icons.School,
    "Pesquisa",
    "Projetos de pesquisa"
  ),
  members: link(
    "/integrantes",
    icons.Group,
    "Integrantes",
    "Conheça os integrantes"
  ),
};

export const endpoints = {
  getEbooks: blogEndpoint("ebooks"),
  getEbooksForTag: blogTagEndpoint("ebooks"),
  getPapers: blogEndpoint("papers"),
  getPapersForTag: blogTagEndpoint("papers"),
  getWorks: blogEndpoint("works"),
  getWorksForTag: blogTagEndpoint("works"),
  getReports: blogEndpoint("reports"),
  getReportsForTag: blogTagEndpoint("reports"),
};

export const pages = getPages(links);

export const client = getAxiosClient({
  endpoints,
  async beforeRequest() {
    getContext().setContext({ loading: true });
  },
  async afterRequest() {
    getContext().setContext({ loading: false });
  },
});
