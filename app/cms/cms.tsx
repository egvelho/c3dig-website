import { useEffect } from "react";
import { getCmsConfig } from "@egvelho/next-meta/cms/get-cms-config";
import { env } from "app/env";
import app from "app.json";
import { pages } from "app/url";
import { homePage } from "./home-page";
import { aboutPage } from "./about-page";
import { membersPage } from "./members-page";
import { researchPage } from "./research-page";
import { booksPage } from "./books-page";
import { podcastsPage } from "./podcasts-page";
import { ebooksPage } from "./ebooks-page";
import { papersPage } from "./papers-page";
import { reportsPage } from "./reports-page";
import { worksPage } from "./works-page";
import { eventsPage } from "./events-page";
import { videosPage } from "./videos-page";

export const cms = pages.cms.page(() => {
  const isProduction = env().nodeEnv === "production";

  const cmsConfig = getCmsConfig({
    locale: app.lang,
    backend: isProduction
      ? {
          name: "github",
          repo: env().gitRepo,
          branch: env().gitBranch,
          base_url: env().gitOAuthUrl,
          auth_endpoint: "api/auth",
        }
      : {
          name: "test-repo",
        },
    enableEditorialWorkflow: isProduction,
    showPreviewLinks: false,
    developmentMode: !isProduction,
    collections: [
      homePage,
      aboutPage,
      membersPage,
      researchPage,
      booksPage,
      podcastsPage,
      eventsPage,
      videosPage,
      ebooksPage.collection,
      papersPage.collection,
      reportsPage.collection,
      worksPage.collection,
    ],
  });

  useEffect(() => {
    (async () => {
      if (document.querySelector("#nc-root") !== null) {
        return;
      }

      (window as any).CMS_MANUAL_INIT = true;

      const root = document.createElement("div");
      const style = document.createElement("style");
      let script = document.createElement("script");

      root.id = "nc-root";
      document.body.appendChild(root);

      style.id = "nc-root-style";
      style.innerHTML = `
        #nc-root > div > section > span {
          text-align: center;
        }
        body > *:not(#nc-root):not(.ReactModalPortal) {
          display: none;
        }
      `;

      document.head.appendChild(style);

      script = document.createElement("script");
      script.src = "https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js";
      document.body.appendChild(script);

      while ((window as any).initCMS === undefined) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (isProduction) {
        script = document.createElement("script");
        script.innerHTML = `window.initCMS(${JSON.stringify(cmsConfig)})`;
        document.body.appendChild(script);
      }
    })();

    return () => {
      document.querySelector("#nc-root")?.remove();
      document.querySelector("#nc-root-style")?.remove();
    };
  }, []);

  return <div />;
});
