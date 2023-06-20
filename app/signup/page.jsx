"use client";

import {
  Box,
  Flex,
  FormControl,
  Heading,
  Text,
  FormLabel,
  Input,
  Button,
  Grid,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import Link from "next/link";
import { countries } from "country-flag-icons";
import { useState } from "react";

const SignUp = () => {
  // states
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [vegan, setVegan] = useState(false);

  return (
    <>
      <Box>
        <Box paddingBottom={"1rem"}>
          <Box padding={"1rem 0"}>
            <Heading as={"h2"} fontSize={"lg"} textAlign={"center"}>
              Are you new
            </Heading>
            <Text fontSize={"3xl"} textAlign={"center"}>
              Create a new account
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
          <Flex>
            <Box margin={"auto"} width={"60%"} padding={"1rem"}>
              <form>
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor="fullname">Fullname</FormLabel>
                      <Input
                        type="text"
                        id="fullname"
                        placeholder="fullname is required"
                        name="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Input
                        type="text"
                        id="username"
                        placeholder="username is required"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor="phone">Phone Number</FormLabel>
                      <Input
                        type="text"
                        placeholder="Include country code [+256.....]"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="text"
                      id="email"
                      placeholder="email is required"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="password is required"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box padding="1rem 0">
                  <Text display="flex">
                    Access your account{" "}
                    <Link
                      href={"/signin"}
                      style={{
                        color: ThemeColors.darkColor,
                        margin: "0 0.5rem",
                      }}
                    >
                      Sign In
                    </Link>
                  </Text>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Checkbox
                    name="vegan"
                    value={vegan}
                    onChange={(e) => setVegan(e.target.value)}
                  >
                    Are you vegetarian ?
                  </Checkbox>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Button
                    type="submit"
                    color={ThemeColors.lightColor}
                    background={ThemeColors.darkColor}
                    border={"1.7px solid " + ThemeColors.darkColor}
                    borderRadius={"0.3rem"}
                    padding={"1rem"}
                    className="secondary-light-font"
                    fontSize={"md"}
                    _hover={{
                      background: "none",
                      color: ThemeColors.darkColor,
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </form>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
