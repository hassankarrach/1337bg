import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import Navbar from "@/components/navbar/navbar";


const inter = Inter({ subsets: ["latin"] });
//Next_Auth
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "1337 Hub",
  description: "TBA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <SessionProvider>
        <StyledComponentsRegistry>
          <body className={inter.className}>
            {/* <Navbar /> */}
            {children}
          </body>
        </StyledComponentsRegistry>
      </SessionProvider>
    </html>
  );
}
