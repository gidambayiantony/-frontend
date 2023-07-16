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
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { ThemeColors } from "@constants/constants";
import { useSubscriptionCardPostMutation } from "@slices/usersApiSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uniqueString } from "uuid";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const TabThree = ({ updateTabIndex, data }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [createSubscription] = useSubscriptionCardPostMutation();

  const router = useRouter();

  const chakraToast = useToast();

  const flwConfig = {
    public_key: "FLWPUBK_TEST-07d1b505448d1358e34d597736dd6b8a-X",
    tx_ref: Date.now(),
    amount: data?.total,
    currency: "UGX",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: `${data?.personalInfo?.email}`,
      phone_number: `${data?.personalInfo?.phone}`,
      name: `${data?.personalInfo?.firstname} ${data?.personalInfo?.lastname}`,
    },
    customizations: {
      title: "YooCard Purchase",
      description: `You are purchasing a ${data?.selectedSubscriptionCard?.type} ${data?.selectedSubscriptionCard?.name} YooCard`,
      logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
    },
  };

  const handleFlutterPayment = useFlutterwave(flwConfig);

  const handleTabThree = async () => {
    // set loading to be true
    setLoading((prevState) => (prevState ? false : true));

    if (paymentMethod == "") {
      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));

      return chakraToast({
        title: "Error",
        description: "Please choose a payment option",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }

    // if user chooses pay with mobile money or credit/debit card
    if (paymentMethod !== "cash") {
      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));

      handleFlutterPayment({
        callback: async (response) => {
          console.log({ response });
          if (response?.status == "successful") {
            data.paymentMethod = paymentMethod;
            data.paymentId = response?.transaction_id;

            const res = await createSubscription({ data }).unwrap();
            if (res.status == "Succecss") {
              chakraToast({
                title: "Success",
                description: `${res?.data?.message}. Your card(s) will be delivered soon.`,
                status: "success",
                duration: 5000,
                isClosable: false,
              });
              router.push("/");
            }
          } else {
            chakraToast({
              title: "Error",
              description: "Unexpected error",
              status: "error",
              duration: 5000,
              isClosable: false,
            });
          }
          closePaymentModal();
        },
        onClose: () => {
          chakraToast({
            title: "Error",
            description: "Payment cancelled",
            status: "error",
            duration: 5000,
            isClosable: false,
          });
        },
      });

      return;
    }

    // if user chooses pay with cash
    try {
      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));

      data.paymentMethod = paymentMethod;
      const res = await createSubscription({ data }).unwrap();
      if (res.status == "Success") {
        chakraToast({
          title: "Success",
          description: `${res?.data?.message}. Your card(s) will be delivered soon.`,
          status: "success",
          duration: 5000,
          isClosable: false,
        });

        router.push("/");
      }
    } catch (err) {
      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));

      chakraToast({
        title: "Error",
        description: err.error
          ? err.error
          : err.message
          ? err.message
          : "Unexpected error",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
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
            <Box width={{ base: "100%", md: "90%", xl: "80%" }} margin={"auto"}>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(3, 1fr)",
                  md: "repeat(3, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box
                  padding={{
                    base: "1rem 0.5rem",
                    md: "2rem 1rem",
                    xl: "2rem 1rem",
                  }}
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
                    fontSize={{ base: "sm", md: "lg", xl: "2xl" }}
                    textAlign={"center"}
                    alignItems={"center"}
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
                  padding={{
                    base: "1rem 0.5rem",
                    md: "2rem 1rem",
                    xl: "2rem 1rem",
                  }}
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
                    fontSize={{ base: "sm", md: "lg", xl: "2xl" }}
                    textAlign={"center"}
                    alignItems={"center"}
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
                  padding={{
                    base: "1rem 0.5rem",
                    md: "2rem 1rem",
                    xl: "2rem 1rem",
                  }}
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
                    fontSize={{ base: "sm", md: "lg", xl: "2xl" }}
                    textAlign={"center"}
                    alignItems={"center"}
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
            <Box onClick={handleTabThree}>
              {isLoading ? (
                <Spinner />
              ) : (
                <ButtonComponent type={"button"} text={"Complete Checkout"} />
              )}
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default TabThree;