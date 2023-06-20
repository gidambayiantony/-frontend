"use client";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Images, ThemeColors } from "@constants/constants";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <Box
        padding={"3rem 0"}
        borderBottom={"1.7px solid " + ThemeColors.lightColor}
      >
        <Flex>
          <Box margin={"auto"} width={"80%"}>
            <Flex>
              <Box width={"60%"} padding={"1rem"}>
                <Heading
                  as={"h3"}
                  textAlign={"center"}
                  className="secondary-font"
                  fontSize={"4xl"}
                  margin={"0.3rem 0"}
                >
                  We Deliver
                </Heading>
                <Heading
                  as={"h3"}
                  className="secondary-font"
                  fontSize={"5xl"}
                  color={ThemeColors.primaryColor}
                  textAlign={"center"}
                >
                  Never miss a meal, Enjoy now Pay later
                </Heading>
                <Text
                  textAlign={"center"}
                  className="secondary-light-font"
                  fontSize={"2xl"}
                >
                  Fresh food always. Delivered 24/7
                </Text>
                <Box padding={"2rem 0"}>
                  <Flex justifyContent={"center"}>
                    <Link href={"/products"}>
                      <Button
                        color={ThemeColors.lightColor}
                        background={ThemeColors.darkColor}
                        border={"1.7px solid " + ThemeColors.darkColor}
                        borderRadius={"0.3rem"}
                        padding={"2rem"}
                        className="secondary-light-font"
                        fontSize={"lg"}
                        _hover={{
                          background: "none",
                          color: ThemeColors.darkColor,
                        }}
                      >
                        View Products
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Box>
              <Box width={"40%"}>
                <Image src={Images.img} style={{ width: "100%" }} />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Hero;
