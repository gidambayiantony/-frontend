"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Spinner,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import Hero from "@components/Hero";
import { Images, ThemeColors } from "@constants/constants";
import Image from "next/image";
import {
  FaCartPlus,
  FaMoneyBill,
  FaMoneyBillAlt,
  FaMoneyCheck,
  FaTruckLoading,
  FaEnvelope,
  FaPhone,
  FaPhoneAlt,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaUserShield,
  FaUserClock,
  FaRegCreditCard,
  FaHeadset,
} from "react-icons/fa";
import * as HI from "react-icons/hi";
import * as AI from "react-icons/ai";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  useCommentsGetMutation,
  useNewsletterPostMutation,
  useProductsCategoryGetMutation,
} from "@slices/usersApiSlice";
import currency from "currency.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SpecialProducts from "@components/SpecialProducts";
import ButtonComponent from "@components/Button";
import { CgShield } from "react-icons/cg";
import Script from "next/script";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const Home = () => {
  const [Products, setProducts] = useState({ recommended: [], popular: [] });
  const [Comments, setComments] = useState([]);
  const [NewsletterEmail, setNewsletterEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const { userInfo } = useSelector((state) => state.auth);

  const [fetchProducts] = useProductsCategoryGetMutation();
  const [fetchComments] = useCommentsGetMutation();
  const [createNewsletter] = useNewsletterPostMutation();

  const { push } = useRouter();

  const chakraToast = useToast();

  const handleFetchCommentsData = async () => {
    const res = await fetchComments().unwrap();

    if (res?.status && res?.status == "Success") {
      setComments(res?.data);
    }
  };

  const handleFetchProductsData = async () => {
    const res = await fetchProducts(
      JSON.stringify(["recommended", "popular"])
    ).unwrap();

    if (res?.status && res?.status == "Success") {
      setProducts(res.data);
    }
  };

  // comment section slider navigation
  const [currSliderIndex, setCurrSliderIndex] = useState(0);

  const increaseSliderIndex = () => {
    if (currSliderIndex === Comments.length - 1) {
      setCurrSliderIndex((prev) => 0);
    } else {
      setCurrSliderIndex((prev) => prev + 1);
    }
  };

  const decreaseSliderIndex = () => {
    if (currSliderIndex > 0) {
      setCurrSliderIndex((prev) => prev - 1);
    } else {
      setCurrSliderIndex((prev) => Comments.length - 1);
    }
  };

  // submit email for newsletter
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    setLoading((prevState) => (prevState ? false : true));

    try {
      const res = await createNewsletter({ email: NewsletterEmail }).unwrap();

      if (res.status == "Success") {
        // set loading to be false
        setLoading((prevState) => (prevState ? false : true));

        // clear email value
        setNewsletterEmail("");

        chakraToast({
          title: "Success",
          description: "Successfully subscribed to newsletter",
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      }
    } catch (err) {
      // set loading to be false
      setLoading((prevState) => (prevState ? false : true));

      chakraToast({
        title: "Error has occured",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  // fetch product categories
  useEffect(() => {
    handleFetchCommentsData();
    handleFetchProductsData();
  }, []);

  return (
    <>
      <Hero />

      {/* ------------- section 
      ------------------------------- */}
      <Box
        padding={"3rem 0"}
        borderBottom={"1.7px solid " + ThemeColors.lightColor}
      >
        <Flex>
          <Box margin={"auto"} width={{ base: "80%", md: "75%", xl: "70%" }}>
            <Grid
              gridTemplateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gridGap={"1rem"}
            >
              <Box>
                <Flex
                  padding={"0 1rem"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaCreditCard size={60} color={ThemeColors.darkColor} />
                  <Box padding={"0.5rem 0"}>
                    <Text textAlign={"center"} fontSize={"lg"}>
                      Register for 25% YooCard premium & Gold discount
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Flex
                  padding={"0 1rem"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaHeadset size={60} color={ThemeColors.darkColor} />
                  {/* <Image src={Images.customerServiceIcon} width={60} /> */}
                  <Box padding={"0.5rem 0"}>
                    <Text textAlign={"center"} fontSize={"lg"}>
                      24/7 service support
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Flex
                  padding={"0 1rem"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FaTruckLoading size={60} color={ThemeColors.darkColor} />
                  <Box padding={"0.5rem 0"}>
                    <Text textAlign={"center"} fontSize={"lg"}>
                      Delivery offer [21 - 30] <br />
                      (Register for 9 days free delivery)
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Flex
                  padding={"0 1rem"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {/* <CgShield size={60} color={ThemeColors.darkColor} /> */}
                  <Image src={Images.cardSecureIcon} width={60} />
                  <Box padding={"0.5rem 0"}>
                    <Text textAlign={"center"} fontSize={"lg"}>
                      Safe, instant & secured
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Grid>
          </Box>
        </Flex>
      </Box>

      {/* ------------- section 
      ------------------------------- */}
      {Products.length > 0
        ? Products.map(
            (product, index) =>
              product?.category == "popular" &&
              product?.products?.length > 0 && (
                <Box
                  padding={"3rem 0"}
                  borderBottom={"1.7px solid " + ThemeColors.lightColor}
                  key={index}
                >
                  <Flex>
                    <Box
                      margin={"auto"}
                      width={{ base: "95%", md: "90%", xl: "90%" }}
                    >
                      <Box padding={"2rem 0"}>
                        <Heading
                          as={"h2"}
                          fontSize={"3xl"}
                          textAlign={"center"}
                        >
                          Popular Products
                        </Heading>
                        <Flex>
                          <Box
                            height={"0.2rem"}
                            width={"10rem"}
                            margin={"1rem auto"}
                            background={ThemeColors.primaryColor}
                          ></Box>
                        </Flex>
                      </Box>
                      <SpecialProducts
                        Products={product?.products}
                        UGX={UGX}
                        userInfo={userInfo}
                      />
                    </Box>
                  </Flex>
                </Box>
              )
          )
        : ""}

      {/* ------------- section 
      ------------------------------- */}
      <Box padding={"3rem 0"} background={"#000"}>
        <Flex>
          <Box margin={"auto"} width={{ base: "100%", md: "90%", xl: "60%" }}>
            <Box padding={{ base: "2rem", md: "2rem 1rem", xl: "2rem 0" }}>
              <Text
                textAlign={"center"}
                fontSize={{ base: "4xl", md: "4xl", xl: "4xl" }}
                className="secondary-light-font"
                color={ThemeColors.lightColor}
              >
                <span
                  style={{ color: ThemeColors.darkColor, fontWeight: "bold" }}
                  className="secondary-font"
                >
                  YooCard
                </span>
                , your home mobile food bank. Feeding a smile to friends &
                family always
              </Text>
              <Flex justifyContent={"center"} padding={"1rem 0"}>
                <Link href={"/subscription"}>
                  <ButtonComponent
                    type={"button"}
                    text={"Register"}
                    pd={"1.3rem 2rem"}
                  />
                </Link>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* ------------- section 
      ------------------------------- */}
      {Products.length > 0
        ? Products.map(
            (product, index) =>
              product?.category !== "popular" &&
              product?.products?.length > 0 && (
                <Box
                  padding={"3rem 0"}
                  borderBottom={"1.7px solid " + ThemeColors.lightColor}
                  key={index}
                >
                  <Flex>
                    <Box
                      margin={"auto"}
                      width={{ base: "95%", md: "90%", xl: "90%" }}
                    >
                      <Box padding={"2rem 0"}>
                        <Heading
                          as={"h2"}
                          fontSize={"3xl"}
                          textAlign={"center"}
                          textTransform={"capitalize"}
                        >
                          {product?.category} Products
                        </Heading>
                        <Flex>
                          <Box
                            height={"0.2rem"}
                            width={"10rem"}
                            margin={"1rem auto"}
                            background={ThemeColors.primaryColor}
                          ></Box>
                        </Flex>
                      </Box>
                      <SpecialProducts
                        Products={product?.products}
                        category={product?.category}
                        UGX={UGX}
                        userInfo={userInfo}
                      />
                    </Box>
                  </Flex>
                </Box>
              )
          )
        : ""}

      {/* ------------- section 
      ------------------------------- */}
      <Box>
        {Comments.length > 0 ? (
          <Box
            padding={"2rem 0 3rem 0"}
            borderBottom={"1.7px solid " + ThemeColors.lightColor}
            position={"relative"}
          >
            <Box padding={"2rem 0"}>
              <Heading as={"h2"} fontSize={"3xl"} textAlign={"center"}>
                What our customers say
              </Heading>
              <Flex>
                <Box
                  height={"0.2rem"}
                  width={"10rem"}
                  margin={"1rem auto"}
                  background={ThemeColors.primaryColor}
                ></Box>
              </Flex>
            </Box>
            <Box>
              <Box
                cursor={"pointer"}
                position={"absolute"}
                top={"50%"}
                left={{ base: "5%", md: "10%", xl: "15%" }}
              >
                <AI.AiOutlineArrowLeft
                  size={35}
                  onClick={decreaseSliderIndex}
                />
              </Box>
              <Box
                cursor={"pointer"}
                position={"absolute"}
                top={"50%"}
                right={{ base: "5%", md: "10%", xl: "15%" }}
              >
                <AI.AiOutlineArrowRight
                  size={35}
                  onClick={increaseSliderIndex}
                />
              </Box>
            </Box>
            <Flex>
              <Box
                margin={"auto"}
                width={{ base: "80%", md: "60%", xl: "40%" }}
              >
                <Flex justifyContent={"center"}>
                  {Comments.map((comment, index) =>
                    index === currSliderIndex ? (
                      <Box key={index}>
                        <Heading as={"h3"} size={"md"} textAlign={"center"}>
                          {comment.name}
                        </Heading>
                        <Box padding={"0.3rem 0"}>
                          <Text
                            fontSize={"2xl"}
                            textAlign={"center"}
                            className="secondary-light-font"
                          >
                            {comment.message}
                          </Text>
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )
                  )}
                </Flex>
              </Box>
            </Flex>
          </Box>
        ) : (
          ""
        )}
      </Box>

      {/* ------------- section 
      ----------------------------------- */}
      <Box>
        <Box padding={"5rem 0"}>
          <Flex>
            <Box margin={"auto"} width={{ base: "100%", md: "90%", xl: "70%" }}>
              <Flex
                direction={{ base: "column", md: "column", xl: "row" }}
                justifyContent={{
                  base: "center",
                  md: "center",
                  xl: "space-between",
                }}
              >
                <Stack
                  width={{ base: "100%", md: "100%", xl: "50%" }}
                  paddingTop={"2rem"}
                >
                  <Box>
                    <Flex
                      justifyContent={{
                        base: "center",
                        md: "center",
                        xl: "none",
                      }}
                    >
                      <Box padding={"1rem"}>
                        <HI.HiOutlinePhoneOutgoing
                          size={30}
                          color={ThemeColors.darkColor}
                        />
                      </Box>
                      <Box>
                        <Heading
                          as={"h2"}
                          className="secondary-font"
                          size={"md"}
                          color={ThemeColors.darkColor}
                          margin={"0.3rem 0"}
                        >
                          Have a question ?
                        </Heading>
                        <Text style={{ fontSize: "1.1rem" }}>
                          +256 754615840
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex
                      padding={""}
                      justifyContent={{
                        base: "center",
                        md: "center",
                        xl: "none",
                      }}
                    >
                      <Box padding={"1rem"}>
                        {/* <FaEnvelope size={40} color={ThemeColors.darkColor} /> */}
                        <HI.HiOutlineMail
                          size={30}
                          color={ThemeColors.darkColor}
                        />
                      </Box>
                      <Box>
                        <Heading
                          as={"h3"}
                          className="secondary-font"
                          size={"md"}
                          color={ThemeColors.darkColor}
                          margin={"0.3rem 0"}
                        >
                          For Support
                        </Heading>
                        <Text style={{ fontSize: "1.1rem" }}>
                          info@yookatale.com
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Stack>

                <Box
                  padding={"1rem 0"}
                  width={{ base: "100%", md: "100%", xl: "50%" }}
                >
                  <Flex>
                    <Box
                      margin={"auto"}
                      width={{ base: "90%", md: "90%", xl: "100%" }}
                    >
                      <form onSubmit={handleNewsletterSubmit}>
                        <Box
                          border={"1.7px solid " + ThemeColors.lightColor}
                          borderRadius={"0.5rem"}
                          padding={"0.5rem"}
                        >
                          <Box>
                            <Text
                              fontSize={"lg"}
                              fontWeight={"bold"}
                              textAlign={"center"}
                            >
                              Subscribe to our newsletter
                            </Text>
                          </Box>
                          <Box padding={"1rem 0"}>
                            <Input
                              type="text"
                              name={"NewsletterEmail"}
                              placeholder="Enter your email"
                              value={NewsletterEmail}
                              onChange={(e) =>
                                setNewsletterEmail(e.target.value)
                              }
                            />
                          </Box>
                          <Box padding={"0.3rem 0"}>
                            <Text
                              textAlign={{
                                base: "center",
                                md: "center",
                                xl: "left",
                              }}
                            >
                              By clicking "Subscribe" I agree to receive news,
                              promotions, information and offers from YooKatale
                            </Text>
                          </Box>
                          <Box padding={"0.5rem 0"}>
                            {isLoading ? (
                              <Spinner />
                            ) : (
                              <ButtonComponent
                                type={"submit"}
                                text={"Subscribe"}
                              />
                            )}
                          </Box>
                        </Box>
                      </form>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Home;
