"use client";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Images, ThemeColors } from "@constants/constants";
import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "./Button";

const Hero = () => {
  return (
    <>
      <div className="bg-[url('/assets/images/banner.jpg')] bg-cover bg-center lg:h-[450px] sm:h-[350px] h-[300px]"></div>
    </>
  );
};

export default Hero;
