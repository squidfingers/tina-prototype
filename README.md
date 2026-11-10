# Hugo + TinaCMS

Hugo site with a [TinaCMS](https://tina.io) admin at `/admin`. The schema is in [tina/config.ts](tina/config.ts).

## Local development

```sh
npm install
npm run dev
```

- Site: http://localhost:1313
- Admin: http://localhost:1313/admin/
- GraphQL API: http://localhost:4001/graphql

In local mode, edits are written straight to the Markdown/YAML files on disk. No login is needed.

## Deploying (TinaCloud)

1. Create a project at https://app.tina.io and connect this GitHub repo.
2. Set these environment variables in the host's build settings (for example, Cloudflare Pages):
   - `TINA_PUBLIC_CLIENT_ID`: the project's Client ID
   - `TINA_TOKEN`: a read-only content token
   - `HUGO_VERSION`: for example `0.169.0`
3. Build command: `npm run build`. Output directory: `public`.

`npm run build` runs `tinacms build` (the admin goes to `static/admin`) and then `hugo --minify`. To build without TinaCloud, use `npm run build:local`.

## Content model notes

- Page components (`params.components`) are Tina block templates. They use `templateKey: "type"` so the `type:` key keeps driving `layouts/_partials/components.html`.
- Rich-text fields inside front matter are saved as Markdown strings and rendered with `.RenderString`, as before.
- Tina rewrites the whole file on save. YAML comments are removed, keys are reordered, and any front-matter field missing from the schema is **dropped**. Add new fields to `tina/config.ts` before using them in content.
