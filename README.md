This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Valentine Image

When you click **Yes**, the app shows an image loaded from:

- `public/valentine.jpg`

Drop your image in that path (any JPG named `valentine.jpg`).

## Background GIF

The page supports a tiled animated background GIF at:

- `public/minions.gif`

Add any dancing GIF you have rights to (named `minions.gif`), and it will appear behind the content.

## Deploy to GitHub Pages

This project is configured for static export and GitHub Pages via GitHub Actions.

1. Push to `main`.
2. In GitHub: **Settings → Pages**
	- **Build and deployment**: select **GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` will build and deploy.

Your site should be available at:

`https://<your-username>.github.io/<your-repo-name>/`

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

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
