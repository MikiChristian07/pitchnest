import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local"; // Import localFont
import "./globals.css";
import 'easymde/dist/easymde.min.css';
import { Toaster } from "@/components/ui/toaster";

const workSans = localFont({
  src: [
    {
      path: "./fonts/workSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/workSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/workSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/workSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/workSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    // {
    //   path: "./fonts/workSana-Regular.ttf",
    //   weight: "400",
    //   style: "normal",
    // },
    {
      path: "./fonts/workSans-Thin.ttf",
      weight: "100", //  Removed duplicate weight
      style: "normal",
    },
    {
      path: "./fonts/workSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "PitchNest",
  description: "Pitch. Nest. Grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
