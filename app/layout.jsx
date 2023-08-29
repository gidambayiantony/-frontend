import Header from "@components/Header";
import Footer from "@components/Footer";
import { Providers } from "./providers";
import "@styles/globals.css";
import CookiePolicy from "@components/CookiePolicy";
import ScriptTag from "@components/ScriptTag";

// import store from "@store";
// import { Provider } from "react-redux";

export const metadata = {
  title: "yookatale",
  description:
    "YooKatale Uganda | Online Food shopping, Organic and Fresh Foods Mobile Market, Affordable, Reliable & Convenient",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
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
