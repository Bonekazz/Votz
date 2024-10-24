export default function InstallMobilePWAModal() {
  return (
     <dialog id="install-pwa-modal" className="modal">

        <div className="modal-box">
          <p>Voce pode instalar o app na área de trabalho</p>
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <button 
                className="w-full bg-blue-500 animated-button p-3 rounded-xl text-white"
              >Entendi</button>
            </form>
          </div>
        </div>

      </dialog>
  )
}
