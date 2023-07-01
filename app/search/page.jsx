"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import { useSearchMutation } from "@slices/usersApiSlice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import currency from "currency.js";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const Search = () => {
  // use the useSearchParam hooks from next/navigation to get url params
  const searchParam = useSearchParams();

  const param = searchParam.get("name");

  const [Products, setProducts] = useState([]);

  const [fetchProducts, { isLoading }] = useSearchMutation();

  // function handle fetching data
  const handleDataFetch = async () => {
    const res = await fetchProducts(param).unwrap();

    if (res?.status && res?.status == "Success") {
      setProducts(res?.Products);
    }
  };

  // fetch product categories
  useEffect(() => {
    handleDataFetch();
  }, [param]);

  return (
    <>
      <Box>
        <Box padding={"2rem 5rem"}>
          <Heading as={"h3"} size={"md"} display={"flex"}>
            Showing results for:
            <Heading
              as={"h3"}
              size={"md"}
              color={ThemeColors.darkColor}
              margin={"0 0.5rem"}
            >
              {param}
            </Heading>
          </Heading>
        </Box>
        <Flex>
          <Box margin={"auto"} width={"75%"}>
            {Products.length > 0 ? (
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                gridGap={"1rem"}
              >
                {Products.map((product, index) => (
                  <Box
                    padding={"1rem"}
                    borderRadius={"md"}
                    _hover={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    key={index}
                  >
                    <Box height={"150px"} padding="0.5rem">
                      <Link href={`/product?id=${product._id}`}>
                        <Flex
                          alignContent={"center"}
                          justifyContent={"center"}
                          height={"100%"}
                        >
                          <Image
                            src={`http://localhost:8000/uploads/${product.images[0]}`}
                            style={{
                              width: "auto",
                              height: "100%",
                              margin: "auto",
                            }}
                          />
                        </Flex>
                      </Link>
                    </Box>
                    <Box>
                      <Text
                        textAlign={"center"}
                        className="secondary-light-font"
                        fontSize={"2xl"}
                      >
                        {product.name}
                      </Text>
                      <Heading
                        as={"h3"}
                        margin={"0.5rem 0"}
                        textAlign={"center"}
                        className="secondary-extra-bold"
                        fontSize={"lg"}
                        color={ThemeColors.darkColor}
                      >
                        {UGX(product.price).format()}
                      </Heading>
                      <Box padding={"0.5rem 0"}>
                        <Flex justifyContent={"center"}>
                          <Button
                            color={ThemeColors.lightColor}
                            background={ThemeColors.darkColor}
                            border={"1.7px solid " + ThemeColors.darkColor}
                            borderRadius={"0.3rem"}
                            padding={"1rem"}
                            className="secondary-light-font"
                            fontSize={"md"}
                            _hover={{
                              border: "1.7px solid " + ThemeColors.lightColor,
                            }}
                            onClick={() => handleAddCart(product._id)}
                          >
                            {isLoading ? (
                              <Spinner />
                            ) : (
                              <FaCartPlus
                                size={26}
                                style={{ margin: "0 0.5rem 0 0" }}
                                color={ThemeColors.lightColor}
                              />
                            )}
                            Add To cart
                          </Button>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Grid>
            ) : (
              <Box>
                <Box padding={"3rem 0"}>
                  <Text fontSize={"3xl"}>No products currently</Text>
                </Box>
              </Box>
            )}
          </Box>
        </Flex>
        <Box padding={"3rem 0"}></Box>
      </Box>
    </>
  );
};

export default Search;
