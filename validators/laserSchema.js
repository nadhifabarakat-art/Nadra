import { z } from "zod";

export const getLaserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const createLaserSchema = z.object({
  body: z.object({
    title: z.string(),
    shortContent: z.string(),
    content: z.string(),
    price: z.number(),
    image: z.string().optional(),
  }),
});

export const updateLaserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
    shortContent: z.string().optional(),
    content: z.string().optional(),
    price: z.number().optional(),
    image: z.string().optional(),
  }),
});

export const deleteLaserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
