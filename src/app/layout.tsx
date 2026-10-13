import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flame Atlas | Combustion Research Intelligence",
  description: "Explore combustion research evidence, compare experimental scenarios, and inspect source-grounded AI responses.",
  icons: { icon: "/icon3.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
