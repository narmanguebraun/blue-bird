import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blue Bird",
  description: "Twitter is alive. Alive!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex bg-black text-white">{children}</div>
      </body>
    </html>
  );
}
