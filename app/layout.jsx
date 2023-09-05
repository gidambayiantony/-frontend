import Header from "@components/Header";
import Footer from "@components/Footer";
import { Providers } from "./providers";
import "./globals.css";
import CookiePolicy from "@components/CookiePolicy";
import ScriptTag from "@components/ScriptTag";
import { Cabin, Inter, Montserrat, Raleway } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const cabin = Cabin({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "yookatale",
  description:
    "YooKatale Uganda | Online Food shopping, Organic and Fresh Foods Mobile Market, Affordable, Reliable & Convenient",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Providers>
            <Header />
            {children}
            <Footer />
            <CookiePolicy />
          </Providers>
          <ScriptTag />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
