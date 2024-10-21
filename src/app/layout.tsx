import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-[100dvw] h-[100dvh]">
        {children}
      </body>
    </html>
  );
}
