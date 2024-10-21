"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function getLocalPlayers() {
  return JSON.parse(localStorage.getItem("players") || "[]");
}

function savePlayersToLocal(players: any[]) {
  localStorage.setItem("players", JSON.stringify(players));
}

export default function Players() {

  const [players, setPlayers] = useState<any[]>([])

  useEffect(() => {
    setPlayers(getLocalPlayers());
  }, []);

  function handlePlayerCreation() {
    setPlayers([...players, {name: "hierro"}]);
    savePlayersToLocal(players);
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span>Players Page</span>
      <Link href="/" className="underline">home</Link>

      <div id="players" className="flex flex-col gap-2 mt-5 border rounded-2xl">
        {players && players.map((player: any, index) => {
          return (
            <span key={index}>{player.name}</span>  
          )
        })}
      </div>

      <div>
        <button onClick={handlePlayerCreation}>create player</button>
      </div>

    </div>
  )
}
