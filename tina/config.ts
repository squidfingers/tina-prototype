import { defineConfig, type Template, type TinaField } from "tinacms";

// -----------------------------------------------------------------------------
// Helpers

const select = (name: string, label: string, options: string[], required = false): TinaField => ({
  name,
  label,
  type: "string",
  required,
  options,
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// -----------------------------------------------------------------------------
// Components (shared field definitions)

const pageTitle: TinaField = {
  name: "title",
  label: "Page Title",
  type: "string",
  isTitle: true,
  required: true,
};

const pageDescription: TinaField = {
  name: "description",
  label: "Page Description",
  type: "string",
  ui: { component: "textarea" },
};

const pageHeader: TinaField = {
  name: "pageHeader",
  label: "Page Header",
  type: "object",
  fields: [
    { name: "enabled", label: "Enabled", type: "boolean" },
    { name: "condensed", label: "Condensed", type: "boolean" },
    { name: "heading", label: "Heading", type: "string" },
    { name: "subheading", label: "Subheading", type: "string" },
    { name: "image", label: "Background Image", type: "image" },
  ],
};

const button: TinaField = {
  name: "button",
  label: "Button",
  type: "object",
  fields: [
    { name: "text", label: "Text", type: "string" },
    { name: "url", label: "URL", type: "string" },
    select("style", "Style", ["default", "outline", "ghost"], true),
    select("variant", "Variant", ["default", "primary", "secondary", "danger"], true),
    select("size", "Size", ["default", "small", "large"], true),
  ],
};

const card: TinaField = {
  name: "card",
  label: "Card",
  type: "object",
  fields: [
    { name: "heading", label: "Heading", type: "string" },
    { name: "description", label: "Description", type: "string" },
    { name: "content", label: "Content", type: "rich-text" },
    {
      name: "footer",
      label: "Footer",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.button?.text || "Button" }),
        defaultItem: { button: { style: "default", variant: "default", size: "default" } },
      },
      fields: [button],
    },
  ],
};

// -----------------------------------------------------------------------------
// Blocks (page components)

const headingBlock: Template = {
  name: "heading",
  label: "Heading",
  ui: {
    itemProps: (item) => ({ label: `Heading: ${item?.text || ""}` }),
    defaultItem: { level: "2" },
  },
  fields: [
    select("level", "Level", ["2", "3", "4", "5", "6"]),
    { name: "text", label: "Text", type: "string" },
  ],
};

const contentBlock: Template = {
  name: "content",
  label: "Content",
  ui: { itemProps: () => ({ label: "Content" }) },
  fields: [{ name: "content", label: "Content", type: "rich-text" }],
};

const accordionBlock: Template = {
  name: "accordion",
  label: "Accordion",
  ui: {
    itemProps: () => ({ label: "Accordion" }),
    defaultItem: { exclusive: true },
  },
  fields: [
    { name: "exclusive", label: "Exclusive", type: "boolean" },
    {
      name: "details",
      label: "Details",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.summary || "Details" }),
        defaultItem: { open: false },
      },
      fields: [
        { name: "summary", label: "Summary", type: "string" },
        { name: "content", label: "Content", type: "rich-text" },
        { name: "open", label: "Open", type: "boolean" },
      ],
    },
  ],
};

const alertBlock: Template = {
  name: "alert",
  label: "Alert",
  ui: {
    itemProps: (item) => ({ label: `Alert: ${item?.variant || "default"}` }),
    defaultItem: { variant: "default" },
  },
  fields: [
    select("variant", "Variant", ["default", "success", "warning", "error"], true),
    { name: "content", label: "Content", type: "rich-text" },
  ],
};

const cardsBlock: Template = {
  name: "cards",
  label: "Cards",
  ui: { itemProps: () => ({ label: "Cards" }) },
  fields: [
    {
      name: "cardlist",
      label: "Card List",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.card?.heading || "Card" }) },
      fields: [card],
    },
  ],
};

const tabsBlock: Template = {
  name: "tabs",
  label: "Tabs",
  ui: { itemProps: () => ({ label: "Tabs" }) },
  fields: [
    {
      name: "tablist",
      label: "Tab List",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.tab || "Tab" }) },
      fields: [
        { name: "tab", label: "Tab", type: "string" },
        { name: "tabpanel", label: "Tab Panel", type: "rich-text" },
      ],
    },
  ],
};

const components: TinaField = {
  name: "components",
  label: "Components",
  type: "object",
  list: true,
  // Hugo's components partial dispatches on `type`, so keep that as the
  // discriminator instead of Tina's default `_template`.
  templateKey: "type",
  templates: [headingBlock, contentBlock, accordionBlock, alertBlock, cardsBlock, tabsBlock],
};

// -----------------------------------------------------------------------------
// Config

const singleFile = { allowedActions: { create: false, delete: false, createFolder: false } };

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.CF_PAGES_BRANCH ||
    process.env.HEAD ||
    "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },

  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "static",
    },
  },

  schema: {
    collections: [
      // Home
      {
        name: "home",
        label: "Home",
        path: "content",
        format: "md",
        match: { include: "_index" },
        ui: singleFile,
        fields: [
          pageTitle,
          pageDescription,
          {
            name: "params",
            label: "Page",
            type: "object",
            fields: [pageHeader, components],
          },
        ],
      },

      // Blog
      {
        name: "blog",
        label: "Blog",
        path: "content/blog",
        format: "md",
        match: { include: "_index" },
        ui: singleFile,
        fields: [
          pageTitle,
          pageDescription,
          {
            name: "cascade",
            label: "All Pages",
            type: "object",
            fields: [
              {
                name: "params",
                label: "Page",
                type: "object",
                fields: [pageHeader],
              },
            ],
          },
        ],
      },

      // Blog Posts
      {
        name: "blogPosts",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        match: { exclude: "_index" },
        defaultItem: () => ({ draft: true, date: new Date().toISOString() }),
        ui: {
          filename: {
            // Matches the previous "{date}-{title}.md" naming.
            slugify: (values) => {
              const date = (values?.date ? new Date(values.date) : new Date())
                .toISOString()
                .slice(0, 10);
              return `${date}-${slugify(values?.title || "untitled")}`;
            },
          },
        },
        fields: [
          { name: "title", label: "Title", type: "string", isTitle: true, required: true },
          {
            name: "date",
            label: "Date",
            type: "datetime",
            required: true,
            ui: { dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" },
          },
          { name: "draft", label: "Draft", type: "boolean" },
          { name: "tags", label: "Tags", type: "string", list: true },
          { name: "body", label: "Content", type: "rich-text", isBody: true },
        ],
      },

      // Site Navigation
      {
        name: "siteNavigation",
        label: "Site Navigation",
        path: "config/_default",
        format: "yaml",
        match: { include: "menu" },
        ui: singleFile,
        fields: [
          {
            name: "main",
            label: "Main Menu",
            type: "object",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Menu Item" }) },
            fields: [
              { name: "name", label: "Name", type: "string", required: true },
              { name: "pageRef", label: "URL", type: "string", required: true },
              { name: "weight", label: "Weight", type: "number" },
            ],
          },
        ],
      },
    ],
  },
});
