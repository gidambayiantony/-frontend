import { Box, Flex, Grid, Text, Heading, Stack } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import React from "react";
import ButtonComponent from "./Button";

const SubscriptionCard = ({ card, btnClick }) => {
  return (
    <>
      <Box
        width={"auto"}
        height={"350px"}
        borderRadius={"md"}
        border={"1.7px solid " + ThemeColors.darkColor}
        className={"card__design"}
      >
        <Box position={"relative"} height={"100%"}>
          <Box hidden>
            <Text>YooCard {card.type}</Text>
          </Box>
          <Box padding={"1rem 1.5rem"}>
            <Box
              padding={"0.5rem 0 1rem 0"}
              borderBottom={"1.7px solid " + ThemeColors.lightColor}
            >
              <Heading as={"h2"} size={"md"} display={"flex"}>
                YooCard
                <Heading
                  as={"h2"}
                  textTransform={"capitalize"}
                  size={"md"}
                  margin={"0 0.3rem"}
                  color={ThemeColors.darkColor}
                >
                  {card.type}
                </Heading>
              </Heading>
              <Text fontSize={"lg"}>{card.name}</Text>
            </Box>
            <Box
              padding={"0.5rem 0 0.5rem 1rem"}
              borderBottom={"1.7px solid " + ThemeColors.lightColor}
            >
              <Stack>
                {card?.details.map((detail, index) => (
                  <Box key={index}>
                    <Text>{detail}</Text>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box padding={"2rem 0"}>
              <Box
                position={"absolute"}
                top={"80%"}
                onClick={btnClick ? () => btnClick(card) : () => {}}
              >
                <ButtonComponent type={"button"} text={"Subscribe"} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SubscriptionCard;
