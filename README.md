# listit.lol

## Quick start

This project has been set up to run inside a dev container with VSCode. You can probably run most of the following commands without the dev container, but you miss out on the consistency of the dev container.

- `cmd + shift + p` to open the command palette and run `Remote-Containers: Reopen in Container`
- `pnpm i` to install dependencies
- `pnpm dev` to start the dev server on localhost:3000
- `pnpm storybook` to start storybook on localhost:6006

## NodeJS Packages

- [x] Remix - React with server side rendering
- [x] Tailwind - CSS
- [x] shadcn/ui - Tailwind component library using radix-ui
- [x] Storybook - GUI for doc & component review
- [x] Chromatic - Visual testing & team review
- [ ] Jest - Testing

## Bundle analysis

- `NODE_ENV=production pnpm build` to build the app
- `pnpm analyze:client` to run bundle analysis on the client js
- `pnpm analyze:server` to run bundle analysis on the server js
- Then browse to the generated report in the `stats` folder

## Deployment

- [x] Github Pages - Storybook [https://earthlingdavey.github.io/listit.lol](https://earthlingdavey.github.io/listit.lol)
- [x] Chromatic - Storybook working but trigger is manual [docs](https://www.chromatic.com/docs/github-actions/)
- [ ] Service TBC - Remix App
