/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  semi: true,
  singleQuote: false,
  useTabs: false,
  tabWidth: 2,
  printWidth: 120,
  trailingComma: "es5",
  importOrder: ["<THIRD_PARTY_MODULES>", "@/(.*)", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default config;
