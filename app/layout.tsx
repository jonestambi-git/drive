import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CDrive — Drive Away with the Right Skills",
  description:
    "Professional driving instruction for all skill levels. Safe, confident, and road-ready courses with certified instructors.",
  keywords: ["driving school", "driving courses", "driving lessons", "CDrive"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/*
          DM Sans — geometric, modern, highly legible at small sizes.
          Perfect for a ride-booking app UI.
          Weights: 400 (body), 500 (medium), 600 (semibold), 700 (bold).
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
