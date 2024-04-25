import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { resolve } from "node:path";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";
import tsconfigPaths from "vite-tsconfig-paths";

const MODE = process.env.NODE_ENV;
installGlobals();

export default defineConfig({
  // optimizeDeps: {
  //   include: [
  //     'zod',
  //     '@conform-to/zod',
  //     '@goodcollect/shared',
  //     // 'remix-development-tools',
  //     // 'remix-utils'
  //   ]
  //   // exclude: ['zod', '@conform-to/zod'] // Explicitly treat 'zod' as an ESM dependency
  // },

  server: {
    port: 3000,
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      "components/*": resolve(__dirname, "./app/components/*"),
      "types/*": resolve(__dirname, "./app/types/*"),
      "server/*": resolve(__dirname, "app/server/*"),
      "schem)s/*": resolve(__dirname, "./app/schemas/*"),
      "utils/*": resolve(__dirname, "./app/utils/*"),
      "routes/*": resolve(__dirname, "./app/routes/*"),
      "hooks/*": resolve(__dirname, "./app/hooks/*"),
      "public/*": resolve(__dirname, "./public/*"),
      "styles/*": resolve(__dirname, "./app/styles/*"),
    },
  },
  build: {
    cssMinify: MODE === "production",
    sourcemap: true,
    commonjsOptions: {
      include: [/frontend/, /packages\/shared/, /node_modules/],
    },
  },
  plugins: [
    cjsInterop({
      dependencies: [
        "@markdoc/markdoc",
        "@goodcollect/shared",
        "fs",
        "path",
        // "zod"
        // "@conform-to/zod",
        // "zod",
        // "remix-utils",
      ],
    }),
    remix({
      ignoredRouteFiles: ["**/*"],
      future: {
        v3_fetcherPersist: true,
      },

      // When running locally in development mode, we use the built in remix
      // server. This does not understand the vercel lambda module format,
      // so we default back to the standard build output.
      // ignoredRouteFiles: ['**/.*', '**/*.test.{js,jsx,ts,tsx}'],
      serverModuleFormat: "esm",

      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes, {
          ignoredRouteFiles: [
            ".*",
            "**/*.css",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__*.*",
            // This is for server-side utilities you want to colocate next to
            // your routes without making an additional directory.
            // If you need a route that includes "server" or "client" in the
            // filename, use the escape brackets like: my-route.[server].tsx
            "**/*.server.*",
            "**/*.client.*",
          ],
          // Since process.cwd() is the server directory, we need to resolve the path to remix project
          appDir: resolve(__dirname, "app"),
        });
      },
    }),
    tsconfigPaths(),
  ],
});
