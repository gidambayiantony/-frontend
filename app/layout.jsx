import Header from "@components/Header";
import Footer from "@components/Footer";
import { Providers } from "./providers";
import "@styles/globals.css";
import Head from "next/head";
import { Images } from "@constants/constants";
import CookiePolicy from "@components/CookiePolicy";
import { NextScript } from "next/document";
import Script from "next/script";
// import store from "@store";
// import { Provider } from "react-redux";

export const metadata = {
  title: "yookatale",
  description:
    "Digital Mobile Food Market | Food insights, Health Lifestyle & industry News | Promotions | Discount coupons & Offers. Reliable, convenient home food bank with YooCard. Publishing weekly",
  icons: {
    icon: Images.logo.src,
  },
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
        </main>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0DY63F5P0Q" />
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];

          const gtag = () => {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', 'G-0DY63F5P0Q');`}
        </Script>
      </body>
    </html>
  );
};

export default RootLayout;
