// import React from 'react'
"use client";

import {
  Box,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import SubscriptionCard from "@components/SubscriptionCard";
import TabOne from "@components/modals/tabs/subscriptionTabs/TabOne";
import TabThree from "@components/modals/tabs/subscriptionTabs/TabThree";
import TabTwo from "@components/modals/tabs/subscriptionTabs/TabTwo";
import { ThemeColors } from "@constants/constants";
import { useSubscriptionCardGetMutation } from "@slices/usersApiSlice";
import { useEffect, useState } from "react";

const Subscription = () => {
  const [SubscriptionCards, setSubscriptionCards] = useState([]);
  const [selectedSubscriptionCard, setSelectedSubscriptionCard] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [tabOneData, setTabOneData] = useState("");

  const [fetchSubscriptionCards] = useSubscriptionCardGetMutation();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleSuscriptionCardSelect = (card) => {
    setSelectedSubscriptionCard(card);
    onOpen();
  };

  const handleSubscriptionCardsFetch = async () => {
    try {
      const res = await fetchSubscriptionCards().unwrap();

      if (res?.status == "Success") {
        setSubscriptionCards(res?.data);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    handleSubscriptionCardsFetch();
  }, []);

  return (
    <>
      <Box>
        <Box padding={"1rem 0 3rem 0"}>
          <Flex>
            <Box margin={"auto"} width={{ base: "90%", md: "80%", xl: "70%" }}>
              <Flex direction={{ base: "column", md: "column", xl: "row" }}>
                <Box
                  width={{ base: "100%", md: "90%", xl: "60%" }}
                  padding={{ base: "1rem 0", md: "2rem 0", xl: "5rem 0" }}
                >
                  <Box>
                    <Heading textAlign={"center"}>
                      <span style={{ color: ThemeColors.darkColor }}>
                        YooCard
                      </span>{" "}
                      - Here for you
                    </Heading>
                  </Box>
                  <Box padding={"1rem 0"}>
                    <Text textAlign={"center"} fontSize={"3xl"}>
                      Celebrate life, live healthly
                    </Text>
                    <Text textAlign={"center"} fontSize={"3xl"}>
                      Food on Demand, Anytime, anywhere
                    </Text>
                  </Box>
                </Box>
                <Box width={{ base: "100%", md: "90%", xl: "40%" }}>
                  <Box
                    padding={{
                      base: "1rem 0",
                      md: "1rem 0",
                      xl: "2rem 0 1rem 0",
                    }}
                  >
                    <Stack
                      border={"1.7px solid " + ThemeColors.lightColor}
                      padding={"0.5rem 1rem"}
                      borderRadius={"md"}
                    >
                      <Box padding={"0.3rem 0"}>
                        <Text fontSize={"lg"}>
                          - Say no to bad feeding habits
                        </Text>
                      </Box>
                      <Box padding={"0.3rem 0"}>
                        <Text fontSize={"lg"}>
                          - You can now enjoy a variety of foods
                        </Text>
                      </Box>
                      <Box padding={"0.3rem 0"}>
                        <Text fontSize={"lg"}>
                          - You don't need cash to eat
                        </Text>
                      </Box>
                      <Box padding={"0.3rem 0"}>
                        <Text fontSize={"lg"}>
                          - You don't need to go to the market
                        </Text>
                      </Box>
                      <Box padding={"0.3rem 0"}>
                        <Text fontSize={"lg"}>
                          - You don't have to peel, just order
                        </Text>
                      </Box>
                      <Box padding={"0.3rem 0"}>
                        <Text fontSize={"lg"}>
                          - No more problems food going bad
                        </Text>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Box padding={"2rem 0"}>
            <Flex>
              <Box margin={"auto"} width={"75%"}>
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  {SubscriptionCards.map((Card, index) => (
                    <SubscriptionCard
                      key={index}
                      card={Card}
                      btnClick={handleSuscriptionCardSelect}
                    />
                  ))}
                </Grid>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* // modal form */}
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"} padding={"1rem 0"}>
        {/* <ModalOverlay /> */}
        <ModalContent
          padding={{ base: "2rem 1rem", md: "2rem", xl: "2rem 3rem" }}
        >
          <ModalCloseButton size={"lg"} color={ThemeColors.darkColor} />
          <Box padding={"1rem 0"}>
            {tabIndex === 0 ? (
              <TabOne
                updateTabIndex={setTabIndex}
                fetchData={setTabOneData}
                card={selectedSubscriptionCard}
              />
            ) : tabIndex === 1 ? (
              <TabTwo
                data={{ ...tabOneData, selectedSubscriptionCard }}
                updateTabIndex={setTabIndex}
              />
            ) : (
              <TabThree
                updateTabIndex={setTabIndex}
                data={{ ...tabOneData, selectedSubscriptionCard }}
              />
            )}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Subscription;
