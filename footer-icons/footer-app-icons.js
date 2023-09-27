import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

const Footer = () => {
  return (
    <ChakraProvider>
      <ThemeProvider>
        <footer>
          <a href="https://apps.apple.com/app/yookatale/id1234567890">
            <img src="/images/app-store-icon.png" alt="Download on the App Store" />
          </a>

          <a href="https://play.google.com/store/apps/details?id=com.yookatale">
            <img src="/images/google-play-icon.png" alt="Get it on Google Play" />
          </a>
        </footer>
      </ThemeProvider>
    </ChakraProvider>
  );
};

export default Footer;

