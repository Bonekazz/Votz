"use client";

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { getLocalPlayers, savePlayersToLocal } from '@/lib/modules/players/queries';
import { Player } from '@/lib/modules/players/types';
import { z } from 'zod';
import { playerSchema } from '@/lib/modules/players/schemas';
import AlertModal from '@/components/modal/AlertModal';
import { Ellipsis, Plus } from 'lucide-react';

export default function Players() {

  const [players, setPlayers] = useState<Player[]>([])

  const [formRating, setFormRating] = useState(2);
  const [formName, setFormName] = useState("");

  const [importedPlayers, setImportedPlayers] = useState("");

  const [editingPlayer, setEditingPlayer] = useState<Player>({id: "", name: "", skillLevel: 0});

  const [selectedPlayer, setSelectedPlayer] = useState<Player>({id: "", name: "", skillLevel: 0});

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

    return true;
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

  function handleSaveEditedPlayer() {
    const newPlayers = players.map((p: Player) => {
      if (p.id === editingPlayer.id) return editingPlayer;
      return p;
    });

    setPlayers(newPlayers);
    savePlayersToLocal(newPlayers);
    closeModal("edit-player-modal");
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-5 px-2 mt-[2em]">

      <div className="flex flex-col gap-5 w-[90%]">

        <div id="players" className="overflow-x-auto h-[60dvh] w-full border rounded-2xl px-3 py-5">

          <div id="players-table" className="flex flex-col gap-5 h-full">

            <div className="flex flex-col items-end gap-5">
              <div className="w-full flex justify-between">
                
                <div className="flex gap-2">
                  <button 
                    className="
                      animated-button flex items-center justify-center
                      border p-1 px-2 rounded-xl w-fit text-sm
                      active:bg-black/10
                    "
                    onClick={() => openModal("import-modal")}
                    >importar</button>
                  <button 
                    className="
                      animated-button flex items-center justify-center
                      border p-1 px-2 rounded-xl w-fit text-sm
                      active:bg-black/10
                    "
                    onClick={handleExport}
                    >exportar</button>
                </div>

                <button 
                  className="
                    animated-button flex items-center justify-center gap-2
                    border p-1 px-2 rounded-xl w-fit text-sm
                    active:bg-black/10
                  "
                  onClick={() => openModal("player-creation-modal")}
                  >
                  <Plus size={20}/>
                  <span>criar</span>
                </button>

              </div>

              <div className="flex font-bold w-full">
                <span className="w-[40px]"></span>
                <span className="w-[100px] px-3">Nome</span>
                <span className="w-[100px] px-3">Habilidade</span>
                <span className="w-[40px]"></span>
              </div>
            </div>

            <div className="flex flex-col overflow-y-scroll">
              {players && players.map((player: Player, index: number) => {
                return (
                  <div key={index} id={player.id} 
                    onClick={() => {
                      openModal("player-actions-modal");
                      setSelectedPlayer(player);
                    }}
                    className={`
                      flex py-[10px] cursor-pointer 
                      last:border-none border-b
                      active:bg-black/10 transition-all ease-in-out rounded-xl`}
                  >
                    <span className="w-[40px] font-bold text-center">{index}</span>
                    <span className="w-[100px] px-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">{player.name}</span>
                    <span className="w-[100px] px-3 text-center">{player.skillLevel}</span>
                    <span className="w-[40px] flex justify-center"><Ellipsis /></span>
                  </div>
                )
              })}
            </div>

          </div>

        </div>

      </div>

      <dialog id="player-creation-modal" className="modal">

        <div className="modal-box">

          <div id="player-form" className="flex flex-col gap-4">

            <input onChange={(e: any) => setFormName(e.target.value)} value={formName} type="text" placeholder="Nome do jogador" className="input input-bordered w-full max-w-xs text-xl" />

            <div className="rating flex flex-col gap-2">
              <span>Nível de habilidade:</span>
              <div>
                <input onChange={() => setFormRating(1)} type="radio" name="edit-player-rating" className="mask mask-star-2 bg-purple-500" checked={formRating === 1}/>
                <input onChange={() => setFormRating(2)} type="radio" name="edit-player-rating" className="mask mask-star-2 bg-purple-500" checked={formRating === 2}/>
                <input onChange={() => setFormRating(3)} type="radio" name="edit-player-rating" className="mask mask-star-2 bg-purple-500" checked={formRating === 3}/>
                <input onChange={() => setFormRating(4)} type="radio" name="edit-player-rating" className="mask mask-star-2 bg-purple-500" checked={formRating === 4}/>
                <input onChange={() => setFormRating(5)} type="radio" name="edit-player-rating" className="mask mask-star-2 bg-purple-500" checked={formRating === 5}/>
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

      { /** EDIT PLAYER MODAL **/ }
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
            <button className="btn no-focus" onClick={handleSaveEditedPlayer}>salvar</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">cancelar</button>
            </form>
          </div>

        </div>

      </dialog>
      { /** END - EDIT PLAYER MODAL **/ }


      <dialog id="player-actions-modal" className="modal">

        <div className="modal-box">

          <div className="flex flex-col">
            <button 
              className="w-full border-b py-3" 
              onClick={() => {
                handleEditPlayer(selectedPlayer.id);
                closeModal("player-actions-modal");
              }}>editar</button>
            <button 
              className="w-full py-3"
              onClick={() => {
                openModal("confirm-delete-modal");
                closeModal("player-actions-modal");
              }}
            >deletar</button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">cancelar</button>
            </form>
          </div>
        </div>

      </dialog>

      <dialog id="confirm-delete-modal" className="modal">

        <div className="modal-box">

          <span className="text-xl font-medium">Tem certeza que deseja excluir este jogador?</span>

          <div className="modal-action">
            <button 
              className="w-full" 
              onClick={() => {
                handleDeletePlayer(selectedPlayer.id) 
                  && closeModal("confirm-delete-modal") 
                  && closeModal("player-actions-modal")
              }}>sim</button>
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
