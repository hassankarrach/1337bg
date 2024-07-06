import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import Navbar from "@/components/navbar/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

//React-query
const inter = Inter({ subsets: ["latin"] });
//Next_Auth
import Providers from "./Providers";
import SideBar from "@/components/sidebar/SideBar";

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
    <html lang="en" suppressHydrationWarning={true}>
      <StyledComponentsRegistry>
        <body className={inter.className}>
          <Providers>
            <SideBar/>
            <Navbar />
            {children}
          </Providers>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
