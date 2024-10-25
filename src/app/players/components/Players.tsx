"use client";

import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLocalPlayers, savePlayersToLocal } from '@/lib/modules/players/queries';
import { Player } from '@/lib/modules/players/types';
import { z } from 'zod';
import { playerSchema } from '@/lib/modules/players/schemas';
import AlertModal from '@/components/modal/AlertModal';

export default function Players() {

  const [players, setPlayers] = useState<Player[]>([])

  const [formRating, setFormRating] = useState(2);
  const [formName, setFormName] = useState("");

  const [importedPlayers, setImportedPlayers] = useState("");

  const [editingPlayer, setEditingPlayer] = useState<Player>({id: "", name: "", skillLevel: 0});

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

  function handleImport() {
    const validatedFields = z.array(playerSchema).safeParse(JSON.parse(importedPlayers));
    if (!validatedFields.success) {
      console.error(validatedFields.error);
      return;
    }

    const data = validatedFields.data;
    savePlayersToLocal(data);
    setPlayers(data);

    closeModal("import-modal");

  }

  async function handleExport() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(players));
      openModal("clipboard-modal-success");
    } catch (error) {
      alert(error);
    }
  }

  function closeModal(modalId: string) {
    if (!modalId) throw new Error("modal id not provided");
    (document.getElementById(modalId) as HTMLDialogElement).close();
  }

  function openModal(modalId: string) {
    if (!modalId) throw new Error("modal id not provided");
    (document.getElementById(modalId) as HTMLDialogElement).showModal();
  }

  function handleEditPlayer(id: string) {
    const player = players.find((p: Player) => p.id === id);
    if (!player) throw new Error("Player id not found");

    setEditingPlayer(player);
    openModal("edit-player-modal");
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <header className="flex items-center gap-5 p-4 border-b">
        <Link href="/" className="">
          <button className="btn">início</button>
        </Link>
        <span className="font-bold text-3xl">Seus Jogadores</span>
      </header>

      <div className="flex flex-col justify-center items-end gap-5">
        
        <div className="flex gap-2">
          <button className="btn w-fit" onClick={() => (document.getElementById("import-modal") as HTMLDialogElement).showModal()}>importar</button>
          <button className="btn w-fit" onClick={handleExport}>exportar</button>
        </div>

        <div id="players" className="overflow-x-auto overflow-y-scroll h-[400px] border rounded-2xl px-5 pb-4">
          <table>
            <thead>
              <tr className="text-center">
                <th></th>
                <th className="p-4">nome</th>
                <th className="p-4">habilidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {players && players.map((player: any, index) => {
                return (
                  <tr key={index} className="text-center">
                    <th className="pt-3">{index + 1}</th>
                    <td className="pt-3">{player.name}</td>
                    <td className="pt-3">{player.skillLevel}</td>
                    <td className="pt-3">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleEditPlayer(player.id)} 
                          className="animated-button border p-2 rounded-2xl text-sm">editar
                        </button>
                        <button 
                          onClick={() => handleDeletePlayer(player.id)} 
                          className="animated-button border p-2 rounded-2xl text-sm">deletar
                        </button>
                      </div>
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

      </div>



      <dialog id="player-creation-modal" className="modal">

        <div className="modal-box">

          <div id="player-form" className="flex flex-col gap-4">

            <input onChange={(e: any) => setFormName(e.target.value)} value={formName} type="text" placeholder="Nome do jogador" className="input input-bordered w-full max-w-xs text-xl" />

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

      <dialog id="import-modal" className="modal">

        <div className="modal-box">

          <input onInput={(e: any) => setImportedPlayers(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />

          <div className="modal-action">
            <button className="btn" onClick={handleImport}>importar</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={resetForm}>cancelar</button>
            </form>
          </div>
        </div>

      </dialog>

      <AlertModal id={"clipboard-modal-success"} type={"success"}>A lista de jogadores foi copiada para o seu "copiar e colar".</AlertModal>

      <dialog id="edit-player-modal" className="modal">

        <div className="modal-box">
          
          <span className="text-2xl font-bold">Editar jogador</span>
          
          <div className="flex flex-col gap-3">
            
            <input 
              onInput={(e: any) => setEditingPlayer({...editingPlayer, name: e.target.value})}
              type="text" placeholder="Nome do jogador" value={editingPlayer && editingPlayer.name || ""} 
              className="input input-bordered w-full mt-8" />

            <div className="rating flex flex-col gap-2">
              <span>Nível de habilidade:</span>
              <div>
                <input 
                  onChange={() => setEditingPlayer({...editingPlayer, skillLevel: 1})} 
                  type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={editingPlayer.skillLevel === 1}/>
                <input 
                  onChange={() => setEditingPlayer({...editingPlayer, skillLevel: 2})}
                  type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={editingPlayer.skillLevel === 2}/>
                <input
                  onChange={() => setEditingPlayer({...editingPlayer, skillLevel: 3})}
                  type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={editingPlayer.skillLevel === 3}/>
                <input 
                  onChange={() => setEditingPlayer({...editingPlayer, skillLevel: 4})}
                  type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={editingPlayer.skillLevel === 4}/>
                <input 
                  onChange={() => setEditingPlayer({...editingPlayer, skillLevel: 5})}
                  type="radio" name="rating-2" className="mask mask-star-2 bg-purple-500" checked={editingPlayer.skillLevel === 5}/>
              </div>
            </div>

          </div>

          <div className="modal-action">
            <button className="btn no-focus">salvar</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">cancelar</button>
            </form>
          </div>

        </div>

      </dialog>

    </div>
  )
}
