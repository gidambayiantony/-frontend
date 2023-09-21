"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Input,
  Spacer,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CategoriesJson, ThemeColors } from "@constants/constants";
import Link from "next/link";
import { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import ButtonComponent from "./Button";
import { useNewsletterPostMutation } from "@slices/usersApiSlice";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  WhatsappIcon,
  WhatsappShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  LinkedinIcon,
  TwitterIcon,
  TelegramIcon,
} from "react-share";
import axios from "axios";
import { Loader } from "lucide-react";
import NewsletterForm from "./NewsletterForm";
// import nodemailer from "nodemailer";

const Footer = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [NewsletterEmail, setNewsletterEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [createNewsletter] = useNewsletterPostMutation();
  const chakraToast = useToast();

  const shareUrl = "https://www.yookatale.com"; // URL to be shared
  const defaultMessage =
    "Hey, I am using YooKatale. Forget about going to the market. Enjoy low cost discounted products and never miss a meal with your friends and family!"; // Default message

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    try {
      const res = await createNewsletter({ email: NewsletterEmail }).unwrap();

      if (res.status === "Success") {
        // Clear email value
        setNewsletterEmail("");

        // // make call to api to send mail
        // const res = await axios.post("/api/mail", { email: NewsletterEmail });

        // if (res.statusText == "OK")
        return chakraToast({
          title: "Success",
          description: "Successfully subscribed to the newsletter",
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      }
    } catch (err) {
      // Display error message
      chakraToast({
        title: "Error",
        description: err.data?.message
          ? err.data.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      {/* // modal newsletter form  */}
      <NewsletterForm />

      <Box borderTop={"1.7px solid " + ThemeColors.lightColor} id="refer">
        <Box padding={"1rem 0 2rem 0"} background={"#0c0c0c"}>
          <Flex>
            <Box width={"80%"} margin={"auto"}>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gridGap={"1rem"}
              >
                <Box padding={"1rem 0"}>
                  <Stack>
                    <Box padding={"0.5rem 0"}>
                      <Text
                        display={"flex"}
                        margin={"0.3rem 0"}
                        color={ThemeColors.lightColor}
                      >
                        <FaPhone
                          size={20}
                          color={ThemeColors.lightColor}
                          style={{ margin: "0 0.3rem 0 0" }}
                        />{" "}
                        256 754615840
                      </Text>
                      <Text
                        display={"flex"}
                        margin={"0.3rem 0"}
                        color={ThemeColors.lightColor}
                      >
                        <FaEnvelope
                          size={20}
                          color={ThemeColors.lightColor}
                          style={{ margin: "0 0.3rem 0 0" }}
                        />
                        info@yookatale.com
                      </Text>
                    </Box>
                    <Box padding={"1rem 0"}>
                      <Flex>
                        <Box margin={"0 0.7rem 0 0"}>
                          <Link
                            href={
                              "https://www.linkedin.com/company/96071915/admin/feed/posts/"
                            }
                          >
                            <FaLinkedin
                              size={23}
                              color={ThemeColors.lightColor}
                              style={{}}
                            />
                          </Link>
                        </Box>
                        <Box margin={"0 0.7rem 0 0"}>
                          <Link
                            href={
                              "https://twitter.com/YooKatale?t=3Q96I9JR98HgA69gisdXdA&s=09"
                            }
                          >
                            <FaTwitter
                              size={23}
                              color={ThemeColors.lightColor}
                              style={{}}
                            />
                          </Link>
                        </Box>
                        <Box margin={"0 0.7rem 0 0"}>
                          <Link href={"https://wa.me/256754615840"}>
                            <FaWhatsapp
                              size={23}
                              color={ThemeColors.lightColor}
                              style={{}}
                            />
                          </Link>
                        </Box>
                        <Box margin={"0 0.7rem 0 0"}>
                          <Link
                            href={
                              "https://www.facebook.com/profile.php?id=100094194942669&mibextid=LQQJ4d"
                            }
                          >
                            <FaFacebook
                              size={23}
                              color={ThemeColors.lightColor}
                              style={{}}
                            />
                          </Link>
                        </Box>
                        <Box margin={"0 0.7rem 0 0"}>
                          <Link
                            href={
                              "https://www.instagram.com/p/CuHdaksN5UW/?igshid=NTc4MTIwNjQ2YQ=="
                            }
                          >
                            <FaInstagram
                              size={23}
                              color={ThemeColors.lightColor}
                            />
                          </Link>
                        </Box>
                      </Flex>
                    </Box>
                  </Stack>
                </Box>

                <Box
                  padding={"1rem 0"}
                  display={{ base: "block", md: "block", xl: "none" }}
                >
                  <form onSubmit={handleNewsletterSubmit}>
                    <Box borderRadius={"0.5rem"} padding={"0.5rem"}>
                      <Box>
                        <Text
                          fontSize={"lg"}
                          fontWeight={"bold"}
                          textAlign={{
                            base: "center",
                            md: "center",
                            xl: "left",
                          }}
                          color={ThemeColors.lightColor}
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
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          color={ThemeColors.lightColor}
                        />
                      </Box>
                      <Box padding={"0.3rem 0"}>
                        <Text
                          fontSize={"sm"}
                          textAlign={{
                            base: "center",
                            md: "center",
                            xl: "left",
                          }}
                          color={ThemeColors.lightColor}
                        >
                          By clicking "Subscribe" I agree to receive news,
                          promotions, information and offers from YooKatale
                        </Text>
                      </Box>
                      <Box padding={"0.5rem 0"}>
                        {isLoading ? (
                          <Spinner />
                        ) : (
                          <ButtonComponent type={"submit"} text={"Subscribe"} />
                        )}
                      </Box>
                    </Box>
                  </form>
                </Box>

                <Box padding={"1rem 0"}>
                  <Stack padding={"1rem"}>
                    {/* <Box margin={"0.3rem 0"}>
                      <Link href={"/products"}>
                        <Text
                          color={ThemeColors.lightColor}
                          _hover={{ color: ThemeColors.darkColor }}
                        >
                          Products
                        </Text>
                      </Link>
                    </Box> */}
                    {userInfo && (
                      <Box margin={"0.3rem 0"}>
                        <Link href={"/subscription"}>
                          <Text
                            color={ThemeColors.lightColor}
                            _hover={{ color: ThemeColors.darkColor }}
                          >
                            Go Premium
                          </Text>
                        </Link>
                      </Box>
                    )}
                    <Box margin={"0.3rem 0"}>
                      <Link href={"/contact"}>
                        <Text
                          color={ThemeColors.lightColor}
                          _hover={{ color: ThemeColors.darkColor }}
                        >
                          Contact
                        </Text>
                      </Link>
                    </Box>
                    <Box margin={"0.3rem 0"}>
                      <Link href={"/about"}>
                        <Text
                          color={ThemeColors.lightColor}
                          _hover={{ color: ThemeColors.darkColor }}
                        >
                          About
                        </Text>
                      </Link>
                    </Box>
                    {/* <Box margin={"0.5rem 0"}>
                          <Link href={"/schedule"} onClick={() =>
                            setMobileNavOpen((prevState) => (prevState ? false : true))
                            }>
                            <Text
                            color={ThemeColors.lightColor}}}
                              _hover={{ color: ThemeColors.darkColor }}
                            >
                              Schedule Delivery
                            </Text>
                          </Link>
                        </Box> */}
                    <Box margin={"0.3rem 0"}>
                      <Link href={"https://newsblog.yookatale.com"}>
                        <Text
                          color={ThemeColors.lightColor}
                          _hover={{ color: ThemeColors.darkColor }}
                        >
                          News Blog
                        </Text>
                      </Link>
                    </Box>
                    <Box margin={"0.3rem 0"}>
                      <Link href={"https://newsblog.yookatale.com/careers"}>
                        <Text
                          color={ThemeColors.lightColor}
                          _hover={{ color: ThemeColors.darkColor }}
                        >
                          Careers
                        </Text>
                      </Link>
                    </Box>
                    <Box margin={"0.3rem 0"}>
                      <Link href={"https://wa.me/256754615840"}>
                        <ButtonComponent
                          text={"Quick Order"}
                          type={"button"}
                          size={"regular"}
                          icon={
                            <FaWhatsapp
                              size={20}
                              color={ThemeColors.lightColor}
                              style={{ margin: "0 0.3rem" }}
                            />
                          }
                        />
                      </Link>
                    </Box>
                  </Stack>
                </Box>

                {/* <Box padding={"1rem 0"}>
                  <Stack padding={"1rem"}>
                    {CategoriesJson.map((category, index) => (
                      <Box margin={"0.3rem 0"} key={index}>
                        <Link href={`/search?q=${category}`}>
                          <Text
                            color={ThemeColors.lightColor}
                            textTransform={"capitalize"}
                            _hover={{ color: ThemeColors.darkColor }}
                          >
                            {category}
                          </Text>
                        </Link>
                      </Box>
                    ))}
                  </Stack>
                </Box> */}

                <Box
                  padding={"1rem 0"}
                  display={{ base: "none", md: "none", xl: "block" }}
                >
                  <form onSubmit={handleNewsletterSubmit}>
                    <Box borderRadius={"0.5rem"} padding={"0.5rem"}>
                      <Box>
                        <Text
                          fontSize={"lg"}
                          fontWeight={"bold"}
                          textAlign={{
                            base: "center",
                            md: "center",
                            xl: "left",
                          }}
                          color={ThemeColors.lightColor}
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
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          color={ThemeColors.lightColor}
                        />
                      </Box>
                      <Box padding={"0.3rem 0"}>
                        <Text
                          fontSize={"sm"}
                          textAlign={{
                            base: "center",
                            md: "center",
                            xl: "left",
                          }}
                          color={ThemeColors.lightColor}
                        >
                          By clicking "Subscribe" I agree to receive news,
                          promotions, information and offers from YooKatale
                        </Text>
                      </Box>
                      <Box padding={"0.5rem 0"}>
                        <ButtonComponent
                          type={"submit"}
                          text={"Subscribe"}
                          icon={isLoading && <Loader size={20} />}
                        />
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Grid>
            </Box>
          </Flex>
        </Box>

        <Flex
          direction={{ base: "column", md: "column", xl: "row" }}
          justifyContent={{ base: "center", md: "center", xl: "none" }}
        >
          <Box padding={{ base: "0.5rem 0", md: "0.5rem 0", xl: "1rem 2rem" }}>
            <Text
              fontSize="md"
              display={"flex"}
              justifyContent={{ base: "center", md: "center", xl: "none" }}
            >
              &copy; {new Date().getFullYear()}
              <Text
                color={ThemeColors.primaryColor}
                margin={"0 0.3rem"}
                fontSize="lg"
                textTransform={"uppercase"}
              >
                yookatale
              </Text>{" "}
              <span style={{ margin: "0.1rem 0 0 0" }}>
                All rights reserved
              </span>
            </Text>
          </Box>

          <Spacer display={{ base: "none", md: "none", xl: "block" }} />

          <Box padding={{ base: "0.5rem 0", md: "0.5rem 0", xl: "none" }}>
            <Flex
              justifyContent={"center"}
              direction={{ base: "column", md: "column", xl: "row" }}
            >
              <Text
                color={ThemeColors.primaryColor}
                margin={"0.5rem"}
                fontSize="lg"
                textTransform={"uppercase"}
                textAlign={"center"}
              >
                Invite A Friend
              </Text>

              <Flex justifyContent={"center"} gap={"2"}>
                <FacebookShareButton url={shareUrl} quote={defaultMessage}>
                  <FacebookIcon size={25} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={defaultMessage}>
                  <TwitterIcon size={25} round />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} title={defaultMessage}>
                  <WhatsappIcon size={25} round />
                </WhatsappShareButton>
                <InstapaperShareButton url={shareUrl} title={defaultMessage}>
                  <InstapaperIcon size={25} round />
                </InstapaperShareButton>
                <LinkedinShareButton url={shareUrl} title={defaultMessage}>
                  <LinkedinIcon size={25} round />
                </LinkedinShareButton>
                <TelegramShareButton url={shareUrl} title={defaultMessage}>
                  <TelegramIcon size={25} round />
                </TelegramShareButton>
              </Flex>
            </Flex>
          </Box>
          <Spacer display={{ base: "none", md: "none", xl: "block" }} />
          <Box padding={{ base: "0", md: "0", xl: "1rem 0" }}>
            <Flex justifyContent={{ base: "center", md: "center", xl: "none" }}>
              <Link href={"/news"}>
                <Box
                  padding={{
                    base: "1rem 0.5rem",
                    md: "1rem 0.5rem",
                    xl: "0 0.5rem",
                  }}
                >
                  <p className="text-md">News</p>
                </Box>
              </Link>
              <Link href={"/partner"}>
                <Box
                  padding={{
                    base: "1rem 0.5rem",
                    md: "1rem 0.5rem",
                    xl: "0 0.5rem",
                  }}
                >
                  <p className="text-md">Partner</p>
                </Box>
              </Link>
              <Link href={"/faqs"}>
                <Box
                  padding={{
                    base: "1rem 0.5rem",
                    md: "1rem 0.5rem",
                    xl: "0 0.5rem",
                  }}
                >
                  <p className="text-md">Faqs</p>
                </Box>
              </Link>
              <Link href={"/privacy"}>
                <Box
                  padding={{
                    base: "1rem 0.5rem",
                    md: "1rem 0.5rem",
                    xl: "0 0.5rem",
                  }}
                >
                  <p className="text-md">Privacy Policy</p>
                </Box>
              </Link>
              <Link href={"/usage"}>
                <Box
                  padding={{
                    base: "1rem 0.5rem",
                    md: "1rem 0.5rem",
                    xl: "0 0.5rem",
                  }}
                >
                  <p className="text-md">Usage Policy</p>
                </Box>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
