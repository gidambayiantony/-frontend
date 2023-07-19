// import React from 'react'
"use client";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import SubscriptionCard from "@components/SubscriptionCard";
import TabOne from "@components/modals/tabs/subscriptionTabs/TabOne";
import TabTwo from "@components/modals/tabs/subscriptionTabs/TabTwo";
import { ThemeColors } from "@constants/constants";
import { useSubscriptionCardGetMutation } from "@slices/usersApiSlice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Subscription = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [moreInfo, setMoreInfo] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    gender: "",
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    address1: "",
    address2: "",
  });

  const [numberOfCards, setNumberOfCards] = useState(1);

  const searchParam = useSearchParams();

  const chakraToast = useToast();

  const cardType = searchParam.get("card");
  const cardPrice = searchParam.get("price");

  const { userInfo } = useSelector((state) => state.auth);

  const [fetchSubscriptionCards] = useSubscriptionCardGetMutation();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleSubscriptionCardSelect = (card) => {
    setSelectedSubscriptionCard(card);
    onOpen();
  };

  useEffect(() => {
    if (userInfo) setPersonalInfo({ ...personalInfo, ...userInfo });
  }, []);

  const handleSubmitForm = () => {
    if (deliveryAddress?.address1 == "" && deliveryAddress?.address2 == "")
      return chakraToast({
        title: "Error",
        description: "Please enter an address",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    onOpen();
  };

  return (
    <>
      <Box>
        <Box padding={"2rem 0 3rem 0"}>
          <Box
            paddingBottom={"1rem"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Text textAlign={"center"} fontSize={"4xl"} display={"flex"}>
              YooCard{" "}
              <Text
                textAlign={"center"}
                fontWeight={"bold"}
                color={ThemeColors.darkColor}
                textTransform={"capitalize"}
                fontSize={"4xl"}
              >
                {cardType}
              </Text>
            </Text>
          </Box>
          <Flex>
            <Box margin={"auto"} width={{ base: "90%", md: "80%", xl: "70%" }}>
              <Box padding={"1rem 0"}>
                <Text textAlign={"center"} fontSize={"2xl"}>
                  Fill the form to continue
                </Text>
              </Box>
              <Box
                border={"1.7px solid " + ThemeColors.lightColor}
                borderRadius={"md"}
                padding={"1rem"}
              >
                <form>
                  <Grid
                    gridTemplateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      xl: "repeat(3, 1fr)",
                    }}
                    gridGap={"1rem"}
                    display={userInfo ? "none" : "grid"}
                  >
                    <Box padding={"0.5rem 0"}>
                      <FormControl>
                        <FormLabel htmlFor="firstname">Firstname</FormLabel>
                        <Input
                          type="text"
                          id="firstname"
                          placeholder="firstname is required"
                          name="firstname"
                          value={personalInfo.firstname}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      <FormControl>
                        <FormLabel htmlFor="lastname">Lastname</FormLabel>
                        <Input
                          type="text"
                          id="lastname"
                          placeholder="lastname is required"
                          name="lastname"
                          value={personalInfo.lastname}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      <FormControl>
                        <FormLabel htmlFor="phone">Phone Number</FormLabel>
                        <Input
                          type="text"
                          placeholder="Include country code [+256.....]"
                          name="phone"
                          id="phone"
                          value={personalInfo.phone}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      <FormControl>
                        <FormLabel htmlFor="gender">Gender</FormLabel>
                        <Select
                          placeholder="Select gender"
                          name="gender"
                          id="gender"
                          value={personalInfo.gender}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option value="">Rather not say</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          type="text"
                          id="email"
                          placeholder="email is required"
                          name="email"
                          value={personalInfo.email}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Box padding="0">
                    <Text fontSize={"lg"} fontWeight={"bold"}>
                      Delivery Address
                    </Text>
                  </Box>
                  <Grid
                    gridTemplateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      xl: "repeat(3, 1fr)",
                    }}
                    gridGap={"1rem"}
                  >
                    <Box padding={"0.5rem 0"}>
                      <FormControl>
                        <FormLabel htmlFor="address1">Address 1</FormLabel>
                        <Input
                          type="text"
                          id="address1"
                          placeholder="address1 is required"
                          name="address1"
                          value={deliveryAddress.address1}
                          onChange={(e) =>
                            setDeliveryAddress({
                              ...deliveryAddress,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      <FormControl>
                        <FormLabel htmlFor="address2">Address 2</FormLabel>
                        <Input
                          type="text"
                          id="address2"
                          placeholder="address2 is required"
                          name="address2"
                          value={deliveryAddress.address2}
                          onChange={(e) =>
                            setDeliveryAddress({
                              ...deliveryAddress,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      <FormControl>
                        <FormLabel htmlFor="cardNos">Number of Cards</FormLabel>
                        <Input
                          type="number"
                          id="cardNos"
                          placeholder="Number of cards is required"
                          name="cardNos"
                          value={numberOfCards}
                          onChange={(e) => setNumberOfCards(e.target.value)}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor="moreInfo">
                        Additional Information
                      </FormLabel>
                      <Textarea
                        placeholder="Any additional information"
                        name="moreInfo"
                        onChange={(e) => setMoreInfo(e.target.value)}
                        value={moreInfo}
                      ></Textarea>
                    </FormControl>
                  </Box>
                  <Box padding={"1rem 0"}>
                    <Text>
                      Card Price:{" "}
                      {cardPrice ? `UGX ${cardPrice}` : "Contact for price"}
                    </Text>
                  </Box>
                  <Box onClick={handleSubmitForm}>
                    <ButtonComponent type={"button"} text={"Submit"} />
                  </Box>
                </form>
              </Box>
            </Box>
          </Flex>
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
                data={{
                  ...personalInfo,
                  ...deliveryAddress,
                  moreInfo,
                  card: {
                    type: cardType,
                    price: cardPrice ? cardPrice : "",
                    total: cardPrice
                      ? parseInt(cardPrice) * numberOfCards
                      : "Contact for price",
                    quantity: numberOfCards,
                  },
                }}
                updateTabIndex={setTabIndex}
              />
            ) : (
              <TabTwo
                updateTabIndex={setTabIndex}
                data={{
                  ...personalInfo,
                  ...deliveryAddress,
                  moreInfo,
                  card: {
                    type: cardType,
                    price: cardPrice ? cardPrice : "",
                    total: cardPrice
                      ? parseInt(cardPrice) * numberOfCards
                      : "Contact for price",
                    quantity: numberOfCards,
                  },
                }}
              />
            )}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Subscription;
