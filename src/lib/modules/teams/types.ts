import { Player } from "../players/types";

export interface Team {
  name: string;
  players: (Player | null)[];
  totalSkill: number;
}
