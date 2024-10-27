import { Menu } from "lucide-react";

interface Props { title: string; }
export default function Header({ title }: Props) {
  return (
    <header className="w-full p-5 flex items-center gap-3">
      <label htmlFor="my-drawer" className="drawer-button border rounded-xl animated-button p-2"><Menu /></label>
      <span className="text-xl font-medium">{ title }</span>
    </header> 
  )
}
