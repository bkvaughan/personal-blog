import { getCollection, type CollectionEntry } from 'astro:content';

export type Campaign = CollectionEntry<'campaigns'>;
export type Session = CollectionEntry<'sessions'>;

// Drafts are visible while running `npm run dev` so you can preview them.
const isPublished = (s: Session) => import.meta.env.DEV || !s.data.draft;

/** Links must include the GitHub Pages base path ("/repo-name"). */
export function href(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** "the-gloaming-deep/003-the-bell" -> "003-the-bell" */
export const sessionSlug = (s: Session) => s.id.split('/').pop()!;

export const sessionUrl = (s: Session) =>
  href(`campaigns/${s.data.campaign.id}/${sessionSlug(s)}/`);

export async function getSessions(campaignId?: string): Promise<Session[]> {
  const all = await getCollection(
    'sessions',
    (s) => isPublished(s) && (!campaignId || s.data.campaign.id === campaignId),
  );
  return all.sort((a, b) => a.data.session - b.data.session);
}

export async function getCampaigns(): Promise<Campaign[]> {
  const statusRank = { active: 0, hiatus: 1, complete: 2 };
  const all = await getCollection('campaigns');
  // Running order wins so the list reads as one saga; unordered campaigns fall to the end.
  return all.sort(
    (a, b) =>
      (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
      statusRank[a.data.status] - statusRank[b.data.status] ||
      a.data.name.localeCompare(b.data.name),
  );
}

/** Fail the build on duplicate session numbers rather than silently mis-ordering. */
export function assertUniqueNumbers(sessions: Session[]) {
  const seen = new Map<number, string>();
  for (const s of sessions) {
    const prior = seen.get(s.data.session);
    if (prior) throw new Error(`Duplicate session number ${s.data.session}: ${prior} and ${s.id}`);
    seen.set(s.data.session, s.id);
  }
}

export function roman(n: number): string {
  const map: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [value, numeral] of map) {
    while (n >= value) {
      out += numeral;
      n -= value;
    }
  }
  return out;
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
