export function closeModal(modalId: string) {
  (document.getElementById(modalId) as HTMLDialogElement).close();
}

export function openModal(modalId: string) {
  (document.getElementById(modalId) as HTMLDialogElement).showModal();
}
