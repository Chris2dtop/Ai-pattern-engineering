import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Pattern Engineering MVP",
  description: "AI-first garment translation tool for designer-to-maker handoff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
