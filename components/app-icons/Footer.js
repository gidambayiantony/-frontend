import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaGooglePlay, FaAppStore } from "react-icons/fa";

function FooterIcon() {
  return (
    <Box as="footer" textAlign="center" padding="4rem" className="border">
      <Link href="https://play.google.com/store/apps/details?id=com.yookatale">
        <FaGooglePlay size={32} color="green" />
      </Link>
      <Link href="https://apps.apple.com/app/yookatale/id1234567890">
        <FaAppStore size={32} color="blue" />
      </Link>
    </Box>
  );
}

export default FooterIcon;
