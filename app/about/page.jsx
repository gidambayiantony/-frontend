"use client";

import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";

// import React from 'react'

const About = () => {
  return (
    <>
      <Box>
        <Box padding={{ base: "3rem 2rem", md: "3rem", xl: "3rem" }}>
          <Box>
            <Heading as={"h3"} size="md" textAlign={"center"}>
              About
            </Heading>
            <Text
              className="secondary-light-font"
              fontSize={"4xl"}
              textAlign={"center"}
            >
              Little About Us
            </Text>
            <Flex>
              <Box
                height={"0.2rem"}
                width={"8rem"}
                margin={"0.5rem auto"}
                background={ThemeColors.primaryColor}
              ></Box>
            </Flex>
          </Box>
          <Box padding={"2rem 0"}>
            <Flex>
              <Box
                margin={"auto"}
                width={{ base: "100%", md: "100%", xl: "80%" }}
              >
                <Flex direction={{ base: "column", md: "column", xl: "row" }}>
                  <Box width={{ base: "100%", md: "100%", xl: "60%" }}>
                    <Text fontSize={"lg"} textAlign={"center"}>
                      YooKatale is a mobile retail and wholesale market for
                      natural and organic foods in Uganda, Africa. We are a
                      customer-centric business that aims to set an industry
                      standard
                    </Text>
                  </Box>
                  <Box
                    width={{ base: "100%", md: "100%", xl: "40%" }}
                    padding={{ base: "1rem 0", md: "0", xl: "0 1rem" }}
                  >
                    <Box
                      border={"1.7px solid " + ThemeColors.lightColor}
                      borderRadius={"md"}
                      padding={"1rem"}
                    >
                      <Heading as={"h3"} size="md">
                        Mission
                      </Heading>
                      <Text
                        className="secondary-light-font"
                        size={"2xl"}
                        margin={"0.3rem 0"}
                      >
                        To permeate vitality among people and communities
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Flex>

            <div className={"py-4"}>
              <div className="flex">
                <div className="m-auto lg:w-4/5 w-full">
                  <div className="py-2">
                    <h3 className="text-lg font-bold">Core Principles</h3>
                  </div>

                  <div className="grid lg:grid-cols-3 lg:py-0 gap-4 py-2">
                    <div className="p-4 border-2 border-light rounded-md">
                      <p className="text-center">
                        You have power & opportunity to make someone smile, do
                        it. we live in an ever changing world, the only fuel
                        that can drive us to a better & peaceful tomorrow for
                        generations is deep compassion for one another.
                      </p>
                    </div>
                    <div className="p-4 border-2 border-light rounded-md">
                      <p className="text-center">
                        Ultimately, we come into existence through love. Spread
                        this feeling throughout the world in your own way,
                        Celebrate life.
                      </p>
                    </div>
                    <div className="p-4 border-2 border-light rounded-md">
                      <p className="text-center">
                        Yookatale is about giving and lifting others with love
                        and trust as the fabric and structure of building happy
                        & healthy communities everywhere.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default About;
