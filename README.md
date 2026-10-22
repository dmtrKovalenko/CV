# Personal CV site

Personal website and CV for [Dmitriy Kovalenko](https://dmtrkovalenko.dev/).

## Development

Use Node.js 24 LTS and Yarn 1.22.22. The Node requirement in `package.json`
also selects Node 24 for Vercel deployments.

```sh
nvm install
nvm use
npm install --global yarn@1.22.22
yarn install --frozen-lockfile
yarn dev
```

The development server runs at http://localhost:4000. Set `TELEGRAM_TOKEN`
and `TELEGRAM_CHAT` in `.env.local` to enable the feedback API. These variables
are also required by the existing API module during a production build.

```sh
yarn typecheck
yarn build
yarn start -p 4000
```

## Resume PDF export

`/api/renderResume` renders the print layout with PDFKit in Node.js. It uses
the same resume, skills, contact and language data as the HTML page, with
locally embedded Inter and Josefin Sans fonts. Text stays selectable and links
stay clickable. No browser, page fetch, external font request or subprocess is
needed. `?variant=full` includes the detailed employment projects.

The PDF layout is in `server/resumePdf.ts`. Keep its layout aligned with
`pages/resume.tsx` when changing the resume design. The portrait is omitted,
matching the HTML print stylesheet. Validate a downloaded PDF after deployment;
font assets are explicitly included in the API's Next.js output tracing.

## Search metadata

`utils/profile.ts` defines the public identity and homepage `ProfilePage` /
`Person` structured data. Its `sameAs` links come from the HTTPS profiles in
`content/contacts.json` and the GitNation speaker profile. Project repositories
belong in the biography, not in `sameAs`.

`components/PageMetadata.tsx` defines page titles, descriptions, canonical URLs
and social previews. The photo-free resume pages point to their corresponding
resume canonical URLs. When adding an indexable page, update this mapping and
`public/sitemap.xml` together.

After deploying:

1. Validate the homepage with [Google's Rich Results Test](https://search.google.com/test/rich-results).
2. Inspect the homepage in [Search Console](https://search.google.com/search-console), request indexing, and submit `sitemap.xml`.
3. Keep external profiles and speaker biographies linked to the website, using
   the preferred name **Dmitriy Kovalenko**.

Structured data helps search engines understand the site; it does not guarantee
a knowledge panel or a particular search appearance.
