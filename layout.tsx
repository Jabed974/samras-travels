import type { Metadata } from "next"; import "./globals.css";
export const metadata:Metadata={title:"সামরাস ট্রাভেলস এন্ড ট্যুরস",description:"ট্রাভেল এজেন্সি ম্যানেজমেন্ট"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body>{children}</body></html>}
