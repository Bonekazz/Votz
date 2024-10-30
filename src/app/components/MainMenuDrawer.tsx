import Header from "@/components/Header";
import { Heart, HeartHandshake, Menu } from "lucide-react";
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

      <div className="drawer w-full h-full">

        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content w-full h-full flex flex-col">
          {/* Page content here */}
          <Header title={title}/>
          { children }
          <div className="p-5 text-center w-full text-sm text-gray-400 flex gap-1 items-center justify-center pb-10">
            <span className="">desenvolvido com</span>
            <Heart size={15} /> 
            <span>por</span>
            <Link className="underline" 
              href="https://linktr.ee/bonekazz" target="_blank">Hierro Fernandes</Link>
          </div>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="bg-white h-full w-80 p-4 flex flex-col justify-between">
            <ul className="menu">
              {/* Sidebar content here */}
              { pages.map((page: Nav, index: number) => {
                return (
                  <li key={index} className={`${page.title === title ? "font-bold underline underline-offset-8 decoration-2" : ""} text-lg py-2 animated-button rounded-xl`}>
                    <Link href={`${page.link}`}>{page.element(page.title)}</Link>   
                  </li>
                )
              }) }
            </ul>
            <Link href="https://ko-fi.com/bonekazz" target="_blank" className="p-2 animated-button rounded-xl flex gap-2 items-center pb-10">
              <HeartHandshake />
              <span>Ajude os desenvolvedores</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
