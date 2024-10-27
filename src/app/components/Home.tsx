"use client";

import { closeModal, openModal } from "@/components/modal/utils";
import { getLocalPlayers } from "@/lib/modules/players/queries";
import { Player } from "@/lib/modules/players/types";
import { Team } from "@/lib/modules/teams/types";
import { genBalancedTeams } from "@/lib/modules/teams/utils";
import { getLocalLastGenedTeams, saveLastGenedTeamsToLocal } from "@/lib/modules/teams/utils/storage";
import Link from "next/link";
import { useEffect, useState } from "react";
import PWASheet from "./PWASheet";
import { Menu, Shuffle } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  const [players, setPlayers] = useState([]);

  const [allSelected, setAllSelected] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[] | []>([]);

  const [generatedTeams, setGeneratedTeams] = useState<any>([]);

  useEffect(() => {
    setPlayers(getLocalPlayers());
    const localTeams = getLocalLastGenedTeams();
    if (localTeams) {
      setGeneratedTeams(localTeams);
      const selected: any = [];
      localTeams.forEach((team: any) => {
        team.players.forEach((player: any) => {
          player && selected.push(player);
        })
      });
      setSelectedPlayers(selected);
    }

  }, []);

  function handlePlayerSelection(isChecked: boolean, player: Player) {
    if (isChecked) return setSelectedPlayers([...selectedPlayers, player]);

    const newSelectedPlayers = selectedPlayers.filter((p: any) => p.id !== player.id);
    setSelectedPlayers(newSelectedPlayers);
  }

  function handleTeamsGen() {
    try {
      const genedTeams = genBalancedTeams(selectedPlayers, 6);
      saveLastGenedTeamsToLocal(genedTeams);
      setGeneratedTeams(genedTeams);
    } catch (error) {
      console.log(error);
    }

    closeModal("teams-gen-modal");
  }

  function resetForm() {
    setSelectedPlayers([]);
    setAllSelected(false);   
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">

      <div className="flex flex-col items-end gap-2 mt-5">
          
        {generatedTeams.length > 0 && <button className="border rounded-xl p-2 animated-button active:bg-black/10" onClick={handleTeamsGen}><Shuffle size={20}/></button>}
        <div id="generated-teams" className="w-fit flex justify-evenly border rounded-2xl h-fit overflow-hidden">

        {generatedTeams && generatedTeams.map((team: Team, index: number) => {
          return (
            <div key={index} className="text-center border-r last:border-none"> 
              <div className={`w-full ${index % 2 === 0 ? "bg-black/10" : ""} py-2 px-5 border-b`}>
                <span className="font-bold">{team.name}</span>
              </div>
              <div className="flex flex-col">
                {team.players.map((player: Player | null, _index: number) => {
                  return (
                    <div key={_index} className="flex flex-col">
                      <div className="text-left p-2 border-b last:border-none">{player ? player.name : 
                        <span className="italic text-black/40">vazio</span>
                      }</div>
                      {team.players.length === (_index + 1) && (
                        <div className="p-2 text-sm">{team.totalSkill}</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        
        </div>
        
      </div>

      <button 
        className="btn mt-5" 
        onClick={() => openModal("teams-gen-modal")}
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
                          checked={(selectedPlayers.find((p: any) => p.id === player.id) ? true : false)}
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
                onClick={() => closeModal("teams-gen-modal")}
              >cancelar</button>
            </form>
          </div>

        </div>
      </dialog>

    </div>
  )
}
