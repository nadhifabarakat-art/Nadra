import { z } from "zod";

export const getOfferSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const createOfferSchema = z.object({
  body: z.object({
    name: z.string(),
    sessions: z.array(z.string()),
    oldPrice: z.number(),
    newPrice: z.number(),
    type: z.enum(["skincare", "laser"]).optional(), // ✅
  }),
});

export const updateOfferSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().optional(),
    sessions: z.array(z.string()).optional(),
    oldPrice: z.number().optional(),
    newPrice: z.number().optional(),
    type: z.enum(["skincare", "laser"]).optional(),
  }),
});

export const deleteOfferSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
