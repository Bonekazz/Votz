import Image from "next/image";

export default function PPGif() {
  return (
    <div className="w-full flex justify-center">
      <Image className="rounded-2xl w-[200px]" src="/pp.webp" width={100} height={100} alt="pp caindo"/>
    </div>
  )
}
