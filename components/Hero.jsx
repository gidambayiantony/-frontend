"use client";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Images, ThemeColors } from "@constants/constants";
import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "./Button";

const Hero = () => {
  return (
    <>
      <div className="bg-[url('/assets/images/img6.jpg')] bg-cover">
        <div className="bg-gradient-to-r from-[#000000d8] to-[#000000d8] lg:py-12 sm:py-8 py-6 ">
          <div className="flex">
            <div className="m-auto lg:w-4/5 w-full">
              <div className="p-4">
                <div className="py-8">
                  <div className="flex justify-center py-4">
                    <div className="m-auto lg:w-3/5 w-full">
                      <h3 className="lg:text-5xl text-4xl text-light text-center mr-2 secondary-light-font">
                        Eat Better, Save Time, Save Money
                      </h3>
                    </div>
                  </div>

                  <div className="flex justify-center py-2">
                    <Link href={"/products"}>
                      <ButtonComponent
                        text={"View Products"}
                        type={"button"}
                        size={"lg"}
                        icon={null}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
