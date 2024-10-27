import Header from "@/components/Header";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

interface Nav {
  link: string;
  title: string;
  element: (t: string) => any;
}


export default function MainMenuDrawer({ title, children }: Props) {

  const pages = [
    {link: "/", title: "Início", element: (t: string) => (<span className="flex gap-2">{t}</span>) },
    {link: "/players", title: "Seus jogadores", element: (t: string) => (<span className="flex gap-2">{t}</span>) },
  ]

  return (
    <div className="w-full h-full">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content w-full h-full flex flex-col">
          {/* Page content here */}
          <Header title={title}/>
          { children }
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            { pages.map((page: Nav, index: number) => {
              return (
                <li key={index} className={`${page.title === title ? "bg-black text-white" : ""} p-2 animated-button`}>
                  <Link href={`${page.link}`}>{page.element(page.title)}</Link>   
                </li>
              )
            }) }
          </ul>
        </div>
      </div>
    </div>
  );
}
