import { Inter } from "next/font/google";
import "./globals.css";
import { getPortfolioData } from "@/lib/data";
import { buildSections } from "@/lib/sections";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";
import SpotlightProvider from "@/components/SpotlightProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

// Content changes in the database show up within a minute, no redeploy.
export const revalidate = 60;

export async function generateMetadata() {
  const { profile } = await getPortfolioData();
  return {
    title: { default: `${profile.fullName} – Portfolio`, template: `%s · ${profile.fullName}` },
    description: profile.headline,
  };
}

// Runs before paint: applies the saved theme (no flash) and marks the page as JS-enabled for reveal animations.
const bootScript = `try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')}catch(e){}`;

export default async function RootLayout({ children }) {
  const data = await getPortfolioData();
  const items = buildSections(data);

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="bg-ambient relative flex min-h-screen flex-col">
        {/* Slow-drifting colour blobs behind everything */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] animate-float rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/15" />
          <div className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] animate-float-slow rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/15" />
          <div className="absolute -bottom-40 right-1/4 h-[26rem] w-[26rem] animate-float rounded-full bg-fuchsia-300/20 blur-3xl dark:bg-fuchsia-500/10" />
        </div>

        <SpotlightProvider />
        <FloatingNav items={items} />
        <main className="flex-1">{children}</main>
        <Footer profile={data.profile} items={items} />
      </body>
    </html>
  );
}
