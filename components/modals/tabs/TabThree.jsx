"use client";

import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Spacer,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { ThemeColors } from "@constants/constants";
import { useState } from "react";

const TabThree = ({ updateTabIndex, completeOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const chakraToast = useToast();

  const handleTabThree = () => {
    paymentMethod == ""
      ? chakraToast({
          title: "Error",
          description: "Please choose a payment method",
          status: "error",
          duration: 5000,
          isClosable: false,
        })
      : completeOrder(paymentMethod);
  };

  return (
    <>
      <Box>
        <Box padding={"1rem 0"}>
          <Heading as={"h3"} size={"md"} textAlign={"center"}>
            Choose payment method
          </Heading>
        </Box>
        <Box padding={"1rem 0"}>
          <Flex>
            <Box width={"100%"} margin={"auto"}>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box
                  padding={"3rem 1rem"}
                  cursor={"pointer"}
                  background={
                    paymentMethod === "cash"
                      ? ThemeColors.darkColor
                      : ThemeColors.lightColor
                  }
                  borderRadius={"0.5rem"}
                  border={
                    "1.7px solid " + paymentMethod === "cash"
                      ? ThemeColors.lightColor
                      : ThemeColors.darkColor
                  }
                  onClick={() => setPaymentMethod("cash")}
                >
                  <Text
                    fontSize={"2xl"}
                    textAlign={"center"}
                    color={
                      paymentMethod === "cash"
                        ? ThemeColors.lightColor
                        : ThemeColors.darkColor
                    }
                  >
                    Pay on delivery
                  </Text>
                </Box>
                <Box
                  padding={"3rem 1rem"}
                  cursor={"pointer"}
                  background={
                    paymentMethod === "mobileMoney"
                      ? ThemeColors.darkColor
                      : ThemeColors.lightColor
                  }
                  borderRadius={"0.5rem"}
                  border={
                    "1.7px solid " + paymentMethod === "mobileMoney"
                      ? ThemeColors.lightColor
                      : ThemeColors.darkColor
                  }
                  onClick={() => setPaymentMethod("mobileMoney")}
                >
                  <Text
                    fontSize={"2xl"}
                    textAlign={"center"}
                    color={
                      paymentMethod === "mobileMoney"
                        ? ThemeColors.lightColor
                        : ThemeColors.darkColor
                    }
                  >
                    Mobile Money
                  </Text>
                </Box>
                <Box
                  padding={"3rem 1rem"}
                  cursor={"pointer"}
                  background={
                    paymentMethod === "card"
                      ? ThemeColors.darkColor
                      : ThemeColors.lightColor
                  }
                  borderRadius={"0.5rem"}
                  border={
                    "1.7px solid " + paymentMethod === "card"
                      ? ThemeColors.lightColor
                      : ThemeColors.darkColor
                  }
                  onClick={() => setPaymentMethod("card")}
                >
                  <Text
                    fontSize={"2xl"}
                    textAlign={"center"}
                    color={
                      paymentMethod === "card"
                        ? ThemeColors.lightColor
                        : ThemeColors.darkColor
                    }
                  >
                    Card
                  </Text>
                </Box>
              </Grid>
            </Box>
          </Flex>
        </Box>
        <Box padding={"1rem 0 0.5rem 0"}>
          <Flex>
            <Box onClick={() => updateTabIndex(1)}>
              <ButtonComponent type={"button"} text={"Back"} />
            </Box>
            <Spacer />
            <Box onClick={() => handleTabThree()}>
              <ButtonComponent type={"button"} text={"Complete Checkout"} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default TabThree;
