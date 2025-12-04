# WDD430-HandcraftedHaven

## Contributors
* Talia Mae Olsen
* Chukwuebuka Cornelius Ibeh
* Melchizedek Galvan Fernandez
* Eno-obong Etim Bassey
* Simeon Chirunga

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## UI Components

Every component for this project is in the `src/components/ui` directory.

- Button
- Input
- Label

#  Runs the TypeScript database-initialization script once (without installing it into the project). It executes init-db.ts, which connects to your Postgres DB and applies non‑destructive schema updates and a test user insert.
pnpm.cmd dlx tsx wdd430-handcraftedhaven/scripts/init-db.ts