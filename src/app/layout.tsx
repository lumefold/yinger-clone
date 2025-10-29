import type { Metadata } from "next";
import "./globals.css";
import Dither from "@/components/dither/Dither";

export const metadata: Metadata = {
  title: "Abdyu ☞ Software Engineer",
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
        <Dither waveColor={[0.5, 0.5, 0.5]} disableAnimation={false} enableMouseInteraction={true} mouseRadius={0.3} colorNum={4} waveAmplitude={0.3} waveFrequency={3} waveSpeed={0.05} />
        {children}
      </body>
    </html>
  );
}
