import { Team } from "../types";

export function saveLastGenedTeamsToLocal(teams: Team[]) {
  localStorage.setItem("lastGenedTeams", JSON.stringify(teams));
}

export function getLocalLastGenedTeams() {
  return JSON.parse(localStorage.getItem("lastGenedTeams") || "[]");
}
