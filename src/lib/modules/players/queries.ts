export function savePlayersToLocal(players: any[]) {
  localStorage.setItem("players", JSON.stringify(players));
}

export function getLocalPlayers() {
  return JSON.parse(localStorage.getItem("players") || "[]");
}
