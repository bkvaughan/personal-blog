import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getEntry } from 'astro:content';
import { SITE } from '../site';
import { getSessions, sessionUrl } from '../lib/data';

export async function GET(context: APIContext) {
  const sessions = (await getSessions()).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const items = await Promise.all(
    sessions.map(async (s) => {
      const campaign = await getEntry(s.data.campaign);
      return {
        title: `${campaign?.data.name ?? s.data.campaign.id}: ${s.data.title}`,
        description: s.data.summary,
        pubDate: s.data.date,
        link: sessionUrl(s),
      };
    }),
  );

  // Channel link must include the GitHub Pages base path, not just the origin.
  const site = new URL(import.meta.env.BASE_URL, context.site!).href;
  return rss({ title: SITE.title, description: SITE.tagline, site, items });
}
