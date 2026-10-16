import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.string(),
    lastVerifiedDate: z.string(),
    author: z.string().default('InvestiQ Quantitative Research Team'),
    tags: z.array(z.string()),
    category: z.enum([
      'Compounding Physics',
      'Real Returns & Inflation',
      'Cash Flow Analytics',
      'Risk & Drawdowns',
      'Retirement & Sequence Risk'
    ]),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string(),
      publisher: z.string(),
      verifiedDate: z.string(),
    })),
  }),
});

export const collections = {
  articles: articlesCollection,
};
