const path = require("node:path");

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {
      config: path.resolve(__dirname, "tailwind.config.cjs"),
    },
    autoprefixer: {},
  },
};
module.exports = config;
