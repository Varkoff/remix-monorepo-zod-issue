import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
} from "@remix-run/react";

import type React from "react";

import { GeneralErrorBoundary } from "./error-boundary";
import tailwindCss from "./global.css?url";

export function ErrorBoundary() {
  const locationKey = useLocation().key;
  const routeError = useRouteError();

  return (
    <Document>
      <GeneralErrorBoundary />
    </Document>
  );
}

export const links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: tailwindCss, as: "style" },
    { rel: "stylesheet", href: tailwindCss },
    { rel: "icon", href: "/favicon.ico" },
  ].filter(Boolean);
};

function Document({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full overflow-x-hidden">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Links />
      </head>

      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </Document>
  );
}
