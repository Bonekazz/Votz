import { Player } from "../../players/types";
import { Team } from "../types";

export function genBalancedTeams(players: any[], minPerTeam: number) {
    const teams: (any | Team)[] = [];

    const totalPlayers = players.length;
    const minPlayers = minPerTeam * 2;

    if (totalPlayers < minPlayers) 
      throw new Error("not enough players");

    const numTeams = Math.ceil(totalPlayers / minPerTeam);

    const bestPlayers: any[] = [];

    for (let i = 1; i <= numTeams; i++) {
      teams.push({
        name: `Team ${i}`,
        players: [],
        totalSkill: 0
      });
    }

    for (let i = 0; i < minPerTeam; i++) {
      bestPlayers.push([]);
    }

    let playersArray = JSON.parse(JSON.stringify(players));
    playersArray.sort((a: Player, b: Player) => b.skillLevel - a.skillLevel);

    const itGen = iterator(totalPlayers);

    for (let i = 0; i < bestPlayers.length; i++) {
      for (let j = 0; j < numTeams; j++) {
        const index = itGen.next();
        if (index.done) break;
        bestPlayers[i].push(playersArray[index.value] || null); 
      }  
    }

    for (let i = 0; i < bestPlayers.length; i++) {
      shuffleArray(bestPlayers[i]);
    }

    for (let i = 0; i < numTeams; i++) {
      for (let j = 0; j < minPerTeam; j++) {
        const bestIndex = Math.floor(Math.random() * 3);

        if (!bestPlayers[j][bestIndex] || bestPlayers[j][bestIndex] === null) {
          for (let x = j; x >= 0; x--) {
            let found = false;
            for (let z = 0; z < numTeams; z++) {
              if (!bestPlayers[x][z] || bestPlayers[x][z] === null) continue;
              teams[i].players.push(bestPlayers[x][z]);
              teams[i].totalSkill += bestPlayers[x][z].skillLevel;
              bestPlayers[x][z] = null;
              found = true;
              break;
            }

            if (found) break;
          }
          continue;
        }

        teams[i].players.push(bestPlayers[j][bestIndex]);
        teams[i].totalSkill += bestPlayers[j][bestIndex].skillLevel;
        bestPlayers[j][bestIndex] = null;
      }
    }

    for (let i = 0; i < teams.length; i++) {
      if (teams[i].players.length < 6) {
        const len = teams[i].players.length;
        for (let z = len; z < minPerTeam; z++) {
          teams[i].players.push(null);
        }
      }
    }
    

    return teams;
}

function *iterator(max: number) {
  let i = 0;
  while (i < max) {
    yield i;
    i++
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
