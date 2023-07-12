"use client";

import { Box, Flex, Grid, Heading, useToast, Text } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import { useOrdersMutation } from "@slices/usersApiSlice";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import currency from "currency.js";
import moment from "moment/moment";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

// import React from 'react'

const Orders = () => {
  const [fetchOrders, { isLoading }] = useOrdersMutation();

  const [Orders, setOrders] = useState({ CompletedOrders: [], AllOrders: [] });

  const chakraToast = useToast();

  const { userInfo } = useSelector((state) => state.auth);

  const fetchData = async () => {
    try {
      const res = await fetchOrders(userInfo._id).unwrap();

      if (res?.status == "Success") {
        setOrders(res?.data);
      }
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box>
        <Box padding={"2rem 3rem"}>
          {/* active orders ----------------- */}
          <Box>
            <Box padding={"0.5rem 0 1rem 0"}>
              <Heading as={"h2"} size={"md"}>
                Active Orders
              </Heading>
            </Box>
            {Orders?.AllOrders?.length > 0 ? (
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gridGap={"1rem"}
              >
                {Orders.AllOrders.map((order, index) =>
                  order?.status !== "completed" ? (
                    <Box
                      key={index}
                      padding={"0.5rem"}
                      borderRadius={"0.5rem"}
                      border={"1.8px solid " + ThemeColors.lightColor}
                    >
                      <Box padding={"0.5rem 0"}>
                        {/* <Box>
                            <Heading as={"h3"} size={"md"}>
                              Product Information
                            </Heading>
                          </Box> */}
                        <Box padding={"0.5rem 0"}>
                          <Box>
                            <Text fontSize={"lg"}>Order ID: {order._id}</Text>
                          </Box>
                          <Box>
                            <Text fontSize={"lg"}>
                              Products:{" "}
                              {order?.productItems ? order?.productItems : "__"}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize={"lg"}>
                              Payment Method:{" "}
                              {order?.payment.paymentMethod
                                ? order?.payment.paymentMethod
                                : "__"}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize={"lg"}>
                              Order Total:{" "}
                              {order?.total ? UGX(order?.total).format() : "__"}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                      <Box padding={"0.5rem 0"}>
                        {order?.deliveryAddress?.address1 !== "" ? (
                          <Box>
                            <Text fontSize={"lg"}>
                              Delivery Address 1:{" "}
                              {order?.deliveryAddress?.address1
                                ? order?.deliveryAddress?.address1
                                : "__"}
                            </Text>
                          </Box>
                        ) : (
                          ""
                        )}
                        {order?.deliveryAddress?.address2 !== "" ? (
                          <Box>
                            <Text fontSize={"lg"}>
                              Delivery Address 2:{" "}
                              {order?.deliveryAddress?.address2
                                ? order?.deliveryAddress?.address2
                                : "__"}
                            </Text>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Box padding={"0.5rem 0"}>
                        {order?.specialRequest?.peeledFood ? (
                          <Box>
                            <Text fontSize={"lg"}>
                              Peel Food:{" "}
                              {order?.specialRequest?.peeledFood
                                ? order?.specialRequest?.peeledFood
                                : "__"}
                            </Text>
                          </Box>
                        ) : (
                          ""
                        )}
                        {order?.specialRequest?.moreInfo ? (
                          <Box>
                            <Text fontSize={"lg"}>
                              Other Requests:{" "}
                              {order?.specialRequest?.moreInfo
                                ? order?.specialRequest?.moreInfo
                                : "__"}
                            </Text>
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Box padding={"0.5rem 0"}>
                        <Box>
                          <Heading as={"h2"} size={"md"} display={"flex"}>
                            Status:{" "}
                            <Heading
                              margin={"0 0.3rem"}
                              as={"h2"}
                              size={"md"}
                              color={ThemeColors.secondaryColor}
                            >
                              {order?.status ? order?.status : "__"}
                            </Heading>
                          </Heading>
                        </Box>
                      </Box>
                      <Box>
                        <Text fontSize={"lg"}>
                          Date:{" "}
                          {order?.createdAt
                            ? moment(order?.createdAt).fromNow()
                            : "__"}
                        </Text>
                      </Box>
                    </Box>
                  ) : (
                    ""
                  )
                )}
              </Grid>
            ) : (
              <Box padding={"3rem 0"}>
                <Text fontSize={"2xl"} textAlign={"center"}>
                  You don't have active orders
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        {/* // previous orders ------------ */}
        <Box padding={"2rem 3rem"}>
          <Box>
            <Box padding={"0.5rem 0 1rem 0"}>
              <Heading as={"h2"} size={"md"}>
                Completed Orders
              </Heading>
            </Box>
            {Orders?.CompletedOrders.length > 0 ? (
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gridGap={"1rem"}
              >
                {Orders?.CompletedOrders.map((order, index) => (
                  <Box
                    key={index}
                    padding={"0.5rem"}
                    borderRadius={"0.5rem"}
                    border={"1.8px solid " + ThemeColors.lightColor}
                  >
                    <Box padding={"0.5rem 0"}>
                      {/* <Box>
                            <Heading as={"h3"} size={"md"}>
                              Product Information
                            </Heading>
                          </Box> */}
                      <Box padding={"0.5rem 0"}>
                        <Box>
                          <Text fontSize={"lg"}>Order ID: {order._id}</Text>
                        </Box>
                        <Box>
                          <Text fontSize={"lg"}>
                            Products:{" "}
                            {order?.productItems ? order?.productItems : "__"}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize={"lg"}>
                            Payment Method:{" "}
                            {order?.paymentMethod ? order?.paymentMethod : "__"}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize={"lg"}>
                            Order Total:{" "}
                            {order?.total ? UGX(order?.total).format() : "__"}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      {order?.deliveryAddress?.address1 !== "" ? (
                        <Box>
                          <Text fontSize={"lg"}>
                            Delivery Address 1:{" "}
                            {order?.deliveryAddress?.address1
                              ? order?.deliveryAddress?.address1
                              : "__"}
                          </Text>
                        </Box>
                      ) : (
                        ""
                      )}
                      {order?.deliveryAddress?.address2 !== "" ? (
                        <Box>
                          <Text fontSize={"lg"}>
                            Delivery Address 2:{" "}
                            {order?.deliveryAddress?.address2
                              ? order?.deliveryAddress?.address2
                              : "__"}
                          </Text>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      {order?.specialRequest?.peeledFood ? (
                        <Box>
                          <Text fontSize={"lg"}>
                            Peel Food:{" "}
                            {order?.specialRequest?.peeledFood
                              ? order?.specialRequest?.peeledFood
                              : "__"}
                          </Text>
                        </Box>
                      ) : (
                        ""
                      )}
                      {order?.specialRequest?.moreInfo ? (
                        <Box>
                          <Text fontSize={"lg"}>
                            Other Requests:{" "}
                            {order?.specialRequest?.moreInfo
                              ? order?.specialRequest?.moreInfo
                              : "__"}
                          </Text>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box padding={"0.5rem 0"}>
                      <Box>
                        <Heading as={"h2"} size={"md"} display={"flex"}>
                          Status:{" "}
                          <Heading
                            margin={"0 0.3rem"}
                            as={"h2"}
                            size={"md"}
                            color={ThemeColors.secondaryColor}
                          >
                            {order?.status ? order?.status : "__"}
                          </Heading>
                        </Heading>
                      </Box>
                    </Box>
                    <Box>
                      <Text fontSize={"lg"}>
                        Date:{" "}
                        {order?.createdAt
                          ? moment(order?.createdAt).fromNow()
                          : "__"}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Grid>
            ) : (
              <Box padding={"3rem 0"}>
                <Text fontSize={"2xl"} textAlign={"center"}>
                  You don't have completed orders
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Orders;
