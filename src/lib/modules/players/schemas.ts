import { z } from "zod";

export const playerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  skillLevel: z.number().min(1).max(5),
})
