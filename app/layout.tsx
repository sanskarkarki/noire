import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOIRÉ — A Table Worth Remembering",
  description: "A cinematic restaurant experience in Kathmandu."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}