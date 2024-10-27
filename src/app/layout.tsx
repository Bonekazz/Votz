import PWAModal from "./components/PWAModal";
import "./globals.css";
import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
}

export const metadata = {
  title: "Votz",
  description: 'App para formar times balanceados',
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/icon-180x180.jpg",
    apple: "/icons/apple-touch-icon-180x180.jpg"
  },
  creator: "Hierro 'Kazz' Fernandes"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-[100dvw] h-[100dvh]">
        { /** <PWAModal /> **/ }
        {children}
      </body>
    </html>
  );
}
