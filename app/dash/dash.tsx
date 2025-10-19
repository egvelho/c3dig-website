import { useContext, ReactNode } from "react";
import {
  Dash as MuiDash,
  DashProps as MuiDashProps,
} from "@egvelho/next-mui/components/dash";
import { icons } from "@egvelho/next-mui/icons";
import { links } from "app/url";
import { Context } from "app/context";
import appConfig from "app.json";
import dashColors from "./dash-colors.json";

const texts = {
  appBarItemsAriaLabel: "Links do cabeçalho",
  drawerButtonAriaLabel: "Abrir menu de navegação",
  drawerItemsAriaLabel: "Links do menu de navegação",
  footerItemsAriaLabel: "Links do rodapé",
  loginLabel: "Entrar",
  createAccountLabel: "Criar conta",
  logoutLabel: "Sair",
};

const logo = {
  path: "/logo.svg",
  width: 90,
  height: 24,
};

const appBarIcons = [
  {
    Icon: icons.Instagram,
    ariaLabel: "C3Dig no Instagram",
    href: "https://instagram.com/c3dig",
    key: "c3dig-instagram",
  },
];

const appBarItems = [links.research, links.members].map((item, key) => ({
  key,
  href: item.href as string,
  label: item.longLabel,
}));

const footerItems: { key: React.Key; href: string; label: React.ReactNode }[] =
  [
    {
      key: "feevale",
      href: "https://www.feevale.br",
      label: <img src="/feevale.png" width="65.58px" height="64px" />,
    },
    {
      key: "cnpq",
      href: "https://www.cnpq.br",
      label: <img src="/cnpq.png" width="130.38px" height="56px" />,
    },
    {
      key: "fapergs",
      href: "https://fapergs.rs.gov.br",
      label: <img src="/fapergs.png" width="90.3px" height="48px" />,
    },
    ...[
      links.about,
      links.contact,
      links.research,
      links.books,
      links.members,
    ].map((item, key) => ({
      key,
      href: item.href as string,
      label: item.longLabel,
    })),
  ];

const bottomNavigationItems = [links.research, links.index, links.members].map(
  (item, key) => ({
    key,
    href: item.href as string,
    label: item.label,
    Icon: item.Icon,
  })
);

const drawerItems = [
  links.members,
  links.research,
  links.books,
  links.contact,
  links.about,
].map((item, key) => ({
  key,
  href: item.href as string,
  label: item.longLabel,
  Icon: item.Icon,
}));

export interface DashProps {
  children: ReactNode;
  snackbarContent: MuiDashProps["snackbarContent"];
  setSnackbarContent: MuiDashProps["setSnackbarContent"];
}

export function Dash({
  children,
  snackbarContent,
  setSnackbarContent,
}: DashProps) {
  const { context, setContext } = useContext(Context);

  return (
    <>
      <MuiDash
        snackbarContent={snackbarContent}
        setSnackbarContent={setSnackbarContent}
        logo={logo.path}
        logoWidth={logo.width}
        logoHeight={logo.height}
        appBarColor={dashColors.appBarColor}
        appBarBackgroundColor={appConfig.dashColor}
        footerColor={dashColors.footerColor}
        footerBackgroundColor={dashColors.footerBackgroundColor}
        drawerOpen={context.drawerOpen}
        setDrawerOpen={(drawerOpen) => setContext({ drawerOpen })}
        appBarItems={appBarItems}
        appBarIcons={appBarIcons}
        footerItems={footerItems}
        bottomNavigationItems={bottomNavigationItems}
        drawerItems={drawerItems}
        {...texts}
      >
        {children}
      </MuiDash>
      <style jsx global>{`
        header nav a,
        footer a {
          font-family: Roboto Mono !important;
          font-weight: 600 !important;
          text-transform: initial !important;
        }

        footer a {
          font-family: Roboto Mono !important;
          font-weight: 500 !important;
          text-transform: initial !important;
        }

        footer {
          padding-top: 32px;
          padding-bottom: 32px;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: Roboto Mono !important;
        }
      `}</style>
    </>
  );
}
