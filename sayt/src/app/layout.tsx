import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educational Portal",
  description: "Institute portal for courses, admissions, and news",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
