// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Actions sets GITHUB_REPOSITORY ("owner/repo"), so the deployed URL is
// derived automatically and survives a repo rename. Locally both are unset and
// the site serves from "/".
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = repo && repo.toLowerCase() === `${owner?.toLowerCase()}.github.io`;

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : 'http://localhost:4321',
  base: repo && !isUserSite ? `/${repo}` : '/',
  trailingSlash: 'ignore',
});
