import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a 6-digit hex colour like #c4502e');

export const EFFECTS = ['embers', 'ash', 'snow', 'spores', 'none'] as const;

const campaigns = defineCollection({
  loader: file('src/content/campaigns.yaml'),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string().optional(),
    status: z.enum(['active', 'hiatus', 'complete']).default('active'),
    started: z.coerce.date().optional(),
    theme: z.object({
      accent: hex, // torchlight, drop caps, highlights
      mist: hex, // tint of card glows
      effect: z.enum(EFFECTS).default('embers'),
    }),
  }),
});

const sessions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sessions' }),
  schema: z.object({
    campaign: reference('campaigns'),
    session: z.number().int().positive(),
    title: z.string(),
    date: z.coerce.date(),
    ingameDate: z.string().optional(),
    summary: z.string(),
    characters: z.array(z.string()).default([]),
    // Shadowdark is lethal; the dead get a memorial on the campaign page.
    fallen: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { campaigns, sessions };
