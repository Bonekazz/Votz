import { Player } from "@/lib/modules/players/types";

const MIN_PLAYERS = 12;
const MIN_TEAM_PLAYERS = 6;

const Players: Player[] = [
    {name: "Hierro", skilLevel: 7},
    {name: "Mario", skilLevel: 8},
    {name: "Henze", skilLevel: 8},
    {name: "Sampaio", skilLevel: 8},
    {name: "Solberg", skilLevel: 9},
    {name: "Vitao", skilLevel: 6},
    {name: "Lucas", skilLevel: 7},
    {name: "Ludmila", skilLevel: 6},
    {name: "Lorena", skilLevel: 6},
    {name: "Hanna", skilLevel: 5},
    {name: "Paulo", skilLevel: 4},
    {name: "Daniel", skilLevel: 5},
    {name: "Thay", skilLevel: 3},
    {name: "Liane", skilLevel: 5},
    {name: "Bia", skilLevel: 4},
    {name: "Hiago", skilLevel: 5},
    {name: "Igo", skilLevel: 6},
    {name: "Nathalie", skilLevel: 5},
    {name: "Jean", skilLevel: 6},
]

function sortTeams(players: any[]) {
    const Teams = [];

    const totalPlayers = players.length;
    if (totalPlayers < MIN_PLAYERS) return {error: "not enough players"};

    let numTeams = 0;
    for (let i = totalPlayers; i > MIN_PLAYERS; i--) {
        if (i % totalPlayers === 0) {
            numTeams = i / MIN_TEAM_PLAYERS;
            break;
        }
    }

    for (let i = 1; i <= numTeams; i++) {
        Teams.push([]);
    }

    return Teams;
}

function populateTeams(players: any[], teams: any[]) {
    
}

function balanceTeams(players: Player[], teamCount: number): Team[] {
    // Sort players by skill level in descending order
    players.sort((a, b) => b.skillLevel - a.skillLevel);

    const teams: Team[] = Array.from({ length: teamCount }, (_, index) => ({
        name: `Team ${index + 1}`,
        players: [],
        totalSkill: 0
    }));

    // Distribute players to teams in a round-robin manner
    players.forEach((player, index) => {
        const teamIndex = index % teamCount; // Cycle through teams
        teams[teamIndex].players.push(player);
        teams[teamIndex].totalSkill += player.skillLevel;
    });

    return teams;
}

const Teams = balanceTeams(Players, 3);
console.log(Teams);
