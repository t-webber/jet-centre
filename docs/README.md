# Telecom Etude Centralised Tool

## Getting Started

### `.env.local`setup

Generate a random `AUTH_SECRET` (e.g. by using `openssl rand -base64 32`), and set up the following environment variables in a `.env.local` file at the root of the project:

```bash
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_id
AUTH_GOOGLE_SECRET=your_google_secret
```

### Node Setup

Then you can install and run the project:

```bash
npm i && npm run dev
```

## External resources

-   [Planning and Specifications](https://docs.google.com/document/d/1CzvHDF7RaJH02KWRsCnQcQE092i8NNxbOPfbOsbXEHg/edit?usp=sharing)
-   [Figma Design](https://www.figma.com/design/3MOoUXn1fM81b36aXTMpKJ/Telecom-Etude-Centralized-Tool?node-id=0-1&t=yhJvmaIEMpC5kIlt-1)
-   [DB Designer](https://dbdesigner.page.link/URRwLbFdp8r9qiiF6)

## Used technologies

### Technical stack

-   Fullstack [Next.js](https://nextjs.org/) (v14), with the App router.
-   [TypeScript](https://www.typescriptlang.org/), for type safety.
-   [Tailwind CSS](https://tailwindcss.com/), for styling.
-   [Auth.js](https://authjs.dev/) (v5 of [NextAuth.js](https://next-auth.js.org/)), for authentication, with the Google Provider.
-   [MongoDB](https://www.mongodb.com/), for the database.
-   [Mongoose](https://mongoosejs.com/), for MongoDB object modeling.

### Recommended tutorials

-   [Auth.js](https://www.youtube.com/watch?v=1MTyCvS05V4) (advanced level, for deep understanding)
-   [Google Provuder](https://www.youtube.com/watch?v=Rs8018RO5YQ)
