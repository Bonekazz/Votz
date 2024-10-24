"use client";

import { getLocalPlayers } from "@/lib/modules/players/queries";
import { Player } from "@/lib/modules/players/types";
import { Team } from "@/lib/modules/teams/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);

  const [allSelected, setAllSelected] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[] | []>([]);

  const [generatedTeams, setGeneratedTeams] = useState<any>([]);

  useEffect(() => {
    setPlayers(getLocalPlayers());
    throw new Error("GO MAKE THE 'balanceTeams' FUNCTION");
  }, []);

  function handlePlayerSelection(isChecked: boolean, player: Player) {
    if (isChecked) return setSelectedPlayers([...selectedPlayers, player]);

    const newSelectedPlayers = selectedPlayers.filter((p: any) => p.id !== player.id);
    setSelectedPlayers(newSelectedPlayers);
  }

  function handleTeamsGen() {
    const selected = JSON.parse(JSON.stringify(selectedPlayers));
    // const genedTeams = balanceTeams(selected, 6, true);
    // console.log(genedTeams);
    // setGeneratedTeams(genedTeams);
    resetForm();
  }

  function resetForm() {
    setSelectedPlayers([]);
    (document.getElementById("teams-gen-modal") as HTMLDialogElement).close();
    setAllSelected(false);   
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <span>Home Page</span>
      <Link href="/players" className="underline">players</Link>

      <div id="generated-teams">

        <table className="w-full">
          <thead>
            <tr className="text-center">
              {generatedTeams && generatedTeams.map((team: Team, index: number) => {
                return (
                  <th key={index} className="p-4">{team.name}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            { generatedTeams && generatedTeams.map((team: Team, index: number) => {
              const teamIndex = index;
              return (
                <tr key={index}>
                  {generatedTeams.map((team: Team, index: number) => {
                    return <td key={index}>{generatedTeams[teamIndex].players[index].name}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        
      </div>

      <button 
        className="btn" 
        onClick={() => (document.getElementById("teams-gen-modal") as HTMLDialogElement).showModal()}
      >gerar times</button>

      <dialog id="teams-gen-modal" className="modal">
        <div className="modal-box">
          
          <span>Selecione os jogadores:</span>
          <div id="players" className="mt-2 overflow-x-auto border p-2 rounded-2xl">
            <table className="w-full">
              <thead>
                <tr className="text-center">
                  <th>
                    <input 
                      checked={allSelected}
                      type="checkbox"
                      className="checkbox"
                      onChange={(e: any) => {
                        if (e.target.checked) {
                          setSelectedPlayers(players);
                          setAllSelected(true);
                          return;
                        };
                        setAllSelected(false);
                        setSelectedPlayers([]);
                      }}
                    />
                  </th>
                  <th className="p-4">Nome</th>
                  <th className="p-4">habilidade</th>
                </tr>
              </thead>
              <tbody>
                {players && players.map((player: Player, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <th>
                        <input 
                          type="checkbox" 
                          className="checkbox"
                          onChange={(e: any) => handlePlayerSelection(e.target.checked, player)}
                          checked={selectedPlayers.find((p: any) => p.id === player.id) ? true : false}
                        />
                      </th>
                      <td>{player.name}</td>
                      <td>{player.skillLevel}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <button 
              className="btn"
              onClick={handleTeamsGen}
            >gerar</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button 
                className="btn"
                onClick={() => setSelectedPlayers([])}
              >cancelar</button>
            </form>
          </div>

        </div>
      </dialog>

    </div>
  )
}
