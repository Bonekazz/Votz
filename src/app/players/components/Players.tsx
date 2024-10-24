"use client";

import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLocalPlayers, savePlayersToLocal } from '@/lib/modules/players/queries';
import { Player } from '@/lib/modules/players/types';


export default function Players() {

  const [players, setPlayers] = useState<Player[]>([])

  const [formRating, setFormRating] = useState(2);
  const [formName, setFormName] = useState("");

  useEffect(() => {
    setPlayers(getLocalPlayers());
  }, []);

  function handlePlayerCreation() {
    console.log("PLAYER: ", {formName, formRating});
    if (!formName) throw new Error("no name was provided");
    
    const newPlayer = {id: uuidv4(), name: formName, skillLevel: formRating};
    savePlayersToLocal([...players, newPlayer]);
    setPlayers([...players, newPlayer]);

    resetForm();

    (document.getElementById("player-creation-modal") as HTMLDialogElement).close();

  }

  function handleDeletePlayer(id: string) {
    const previousPlayers = players;
    const newPlayers = previousPlayers.filter(player => player.id !== id);

    savePlayersToLocal(newPlayers);
    setPlayers(newPlayers);
  }

  function resetForm() {
    setFormName(""); setFormRating(2);
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span>Players Page</span>
      <Link href="/" className="underline">home</Link>

      <div id="players" className="overflow-x-auto">
        <table>
          <thead>
            <tr className="text-center">
              <th></th>
              <th className="p-4">Nome</th>
              <th className="p-4">habilidade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {players && players.map((player: any, index) => {
              return (
                <tr key={index} className="text-center">
                  <th>{index + 1}</th>
                  <td>{player.name}</td>
                  <td>{player.skillLevel}</td>
                  <td>
                    <button 
                      onClick={() => handleDeletePlayer(player.id)} 
                      className="animated-button border p-2 rounded-2xl text-sm">deletar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div>
        <button 
          className="btn"
          onClick={() => (document.getElementById("player-creation-modal") as HTMLDialogElement).showModal()}>criar</button>
      </div>

      <dialog id="player-creation-modal" className="modal">

        <div className="modal-box">

          <div id="player-form" className="flex flex-col gap-4">

            <input onChange={(e: any) => setFormName(e.target.value)} value={formName} type="text" placeholder="Nome do jogador" className="input input-bordered w-full max-w-xs" />

            <div className="rating flex flex-col gap-2">
              <span>Nível de habilidade:</span>
              <div>
                <input onChange={() => setFormRating(1)} type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={formRating === 1}/>
                <input onChange={() => setFormRating(2)} type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={formRating === 2}/>
                <input onChange={() => setFormRating(3)} type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={formRating === 3}/>
                <input onChange={() => setFormRating(4)} type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={formRating === 4}/>
                <input onChange={() => setFormRating(5)} type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={formRating === 5}/>
              </div>
            </div>

          </div>

          <div className="modal-action">
            <button className="btn" onClick={handlePlayerCreation}>salvar</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={resetForm}>cancelar</button>
            </form>
          </div>
        </div>

      </dialog>

    </div>
  )
}
