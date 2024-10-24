import { BeforeInstallPromptEvent } from "@/lib/types";
import getUserMobileOS from "@/lib/utils/OS";
import { useEffect, useState } from "react";

export default function InstallPWAModal() {

  return (
    <dialog id="install--pwa-modal" className="modal">

        <div className="modal-box">
          
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <button 
                className="w-full bg-blue-500 animated-button p-3 rounded-xl"
              >instalar</button>
            </form>
          </div>
        </div>

      </dialog>
  )
}
