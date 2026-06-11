import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    canonicalUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    repo: z.string().url().optional(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    year: z.number().int().optional(),
    featured: z.boolean().default(false),
    /** Id (slug) of a related blog post, e.g. "how-i-cleaned-a-notebook-mess". */
    relatedPost: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
