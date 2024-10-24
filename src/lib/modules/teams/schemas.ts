import { z } from "zod";
import { playerSchema } from "../players/schemas";

export const teamSchema = z.object({
  name: z.string(),
  players: z.array(playerSchema),
  totalSkill: z.number().min(1),
})
