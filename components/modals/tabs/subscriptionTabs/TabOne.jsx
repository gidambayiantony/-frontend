"use client";

import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Select,
  Spacer,
  Textarea,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import currency from "currency.js";
import { ThemeColors } from "@constants/constants";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });
// import React from 'react'

const TabOne = ({ updateTabIndex, fetchData, card }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const chakraToast = useToast();

  const [deliveryAddress, setDeliveryAddress] = useState({
    address1: "",
    address2: "",
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    gender: "",
  });

  const handleDeliveryDataChange = (e) => {
    setDeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
  };

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (e) => {
    setQuantity((prevState) => e.target.value);

    setTotal(e.target.value ? parseInt(e.target.value) * card?.price : 0);
  };

  const handleOrderTotalCalc = () => {
    setTotal(card?.price * quantity);
  };

  const handleTabOneData = () => {
    // check if user has entered address delivery information
    if (deliveryAddress.address1 === "" && deliveryAddress.address2 === "")
      return chakraToast({
        title: "Error has occured",
        description: "Please add a delivery address",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    fetchData({
      deliveryAddress,
      quantity,
      total,
      personalInfo: !userInfo ? personalInfo : userInfo,
    });

    updateTabIndex(1);
  };

  useEffect(() => {
    handleOrderTotalCalc();
  }, []);

  return (
    <>
      <Box>
        <Box>
          {!userInfo ? (
            <>
              <Box>
                <Heading as={"h3"} size={"md"}>
                  Personal Details
                </Heading>
              </Box>
              <Box padding={"1rem 0"}>
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                  }}
                  gridGap={"1rem"}
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
                        onChange={handlePersonalInfoChange}
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
                        onChange={handlePersonalInfoChange}
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
                        onChange={handlePersonalInfoChange}
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
                        onChange={handlePersonalInfoChange}
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
                        onChange={handlePersonalInfoChange}
                      />
                    </FormControl>
                  </Box>
                </Grid>
              </Box>
            </>
          ) : (
            ""
          )}
        </Box>
        <Box padding={"1rem 0"}>
          <FormControl>
            <FormLabel htmlFor="number">Number of cards</FormLabel>
            <Input
              type="number"
              id="number"
              placeholder="number is required"
              name="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </FormControl>
        </Box>
        <Box>
          <Heading as={"h3"} size={"md"}>
            Delivery Details
          </Heading>
        </Box>
        <Box padding={"1rem 0"}>
          <Grid
            gridTemplateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              xl: "repeat(2, 1fr)",
            }}
            gridGap={"1rem"}
          >
            <FormControl>
              <FormLabel htmlFor="address1">Address 1</FormLabel>
              <Textarea
                name="address1"
                id="address1"
                placeholder="Delivery address"
                value={deliveryAddress.address1}
                onChange={handleDeliveryDataChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address2">Address 2</FormLabel>
              <Textarea
                name="address2"
                id="address2"
                placeholder="Delivery address"
                value={deliveryAddress.address2}
                onChange={handleDeliveryDataChange}
              />
            </FormControl>
          </Grid>
        </Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Text margin={"1rem 0"} fontSize={"lg"}>
            Order SubTotal: {UGX(total).format()}
          </Text>
          <Heading as={"h3"} size={"md"}>
            Order Total: {UGX(total).format()}
          </Heading>
        </Box>
        <Box padding={"0.5rem 0"}>
          <Flex>
            <Box></Box>
            <Spacer />
            <Box
              onClick={() => {
                handleTabOneData();
              }}
            >
              <ButtonComponent type={"button"} text={"Continue"} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default TabOne;
