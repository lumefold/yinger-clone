import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Max Yinger ☞ UI Engineer",
  description: "Realtime 3D ° Interaction ° Perf",
  icons: {
    icon: "https://ext.same-assets.com/2592637995/1004217203.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="font-body antialiased h-full w-full box-border">
        {children}
      </body>
    </html>
  );
}
