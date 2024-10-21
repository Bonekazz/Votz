"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <span>Home Page</span>
      <Link href="/players" className="underline">players</Link>
    </div>
  )
}
