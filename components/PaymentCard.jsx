"use client";

import { Box, Text } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import React from "react";

const PaymentCard = ({ text, setPaymentMethod, paymentMethod, type }) => {
  return (
    <Box
      padding={"3rem 2rem"}
      cursor={"pointer"}
      background={
        paymentMethod === type ? ThemeColors.darkColor : ThemeColors.lightColor
      }
      borderRadius={"0.5rem"}
      border={
        "1.7px solid " + paymentMethod === type
          ? ThemeColors.lightColor
          : ThemeColors.darkColor
      }
      onClick={() => setPaymentMethod(type)}
    >
      <Text
        fontSize={"lg"}
        textAlign={"center"}
        color={
          paymentMethod === type
            ? ThemeColors.lightColor
            : ThemeColors.darkColor
        }
      >
        {text}
      </Text>
    </Box>
  );
};

export default PaymentCard;
