"use client";

import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./ProductCard";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const SpecialProducts = ({ Products, UGX, userInfo }) => {
  // handle scrolling to right
  const handleRightScroll = () => {
    const SliderDiv = document.getElementById("container__hide__scrollbar");

    if (SliderDiv.scrollBy) {
      SliderDiv.scrollBy(300, 0);
    }
  };

  // handle scrolling to right
  const handleLeftScroll = () => {
    const SliderDiv = document.getElementById("container__hide__scrollbar");

    if (SliderDiv.scrollBy) {
      SliderDiv.scrollBy(-300, 0);
    }
  };
  return (
    <>
      <Box>
        <Box padding={"1rem"} position={"relative"}>
          <Flex
            flexShrink={0}
            overflowX={"auto"}
            // overflowX={{ base: "hidden", md: "hidden", xl: "auto" }}
            direction={"row"}
            // direction={{ base: "column", md: "column", xl: "row" }}
            id="container__hide__scrollbar"
          >
            {Products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                userInfo={userInfo}
                UGX={UGX}
                width={{ base: "270px", md: "290px", xl: "300px" }}
              />
            ))}
          </Flex>

          {Products.length > 4 && (
            <Box display={{ base: "none", md: "none", xl: "block" }}>
              <Box
                onClick={handleLeftScroll}
                position="absolute"
                top="50%"
                left="-3%"
                cursor="pointer"
              >
                <AiOutlineArrowLeft size={30} />
              </Box>
              <Box
                onClick={handleRightScroll}
                position="absolute"
                top="50%"
                right="-3%"
                cursor="pointer"
              >
                <AiOutlineArrowRight size={30} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SpecialProducts;
