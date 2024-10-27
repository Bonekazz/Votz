"use client";

import { closeModal } from "@/components/modal/utils";
import { useEffect } from "react";

export default function PWAModal() {

  useEffect(() => {
    const modal = document.getElementById("pwa-modal") as HTMLElement;
    if (modal) modal.classList.add("modal-open");
  }, [])

  return (
    <dialog id="pwa-modal" className="modal">

      <div className="modal-box">

        <div className="flex flex-col">
          aaaa
        </div>

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => closeModal("pwa-modal")}>cancelar</button>
          </form>
        </div>
      </div>

    </dialog>
  )
}
