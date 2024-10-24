import { ReactNode } from "react";
import ErrorSVG from "../svg/Error";
import SuccessSVG from "../svg/Success";
import WarningSVG from "../svg/Warning";

type AlertType = "success" | "error" | "warning";

interface Props {
  id: string;
  children: string | ReactNode;
  type?: AlertType;
}

const typesElements = {
  "success": {svg: <SuccessSVG />, title: "Concluído"},
  "error": {svg: <ErrorSVG />, title: "Erro"},
  "warning": {svg: <WarningSVG />, title: "Aviso"},
}

export default function AlertModal({ id, children, type}: Props) {
  return (
    <dialog id={id} className="modal">

        <div className="modal-box">
          
          {type && (
            <div className="flex gap-2 items-center">
              {typesElements[type].svg}
              {typesElements[type].title && (<span className="text-xl">{typesElements[type].title}</span>)}
            </div>
          )}
          <div className="mt-3">{children}</div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">beleza</button>
            </form>
          </div>
        </div>

      </dialog>
  )
}
