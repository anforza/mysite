import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3),
  duration: z.string().min(2),
  fee: z.coerce.number().min(0),
  description: z.string().min(10),
});

export const newsSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
});
