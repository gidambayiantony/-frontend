import ButtonComponent from "@components/Button";
import Image from "next/image";
import React from "react";

const LoyaltyPage = () => {
  return (
    <div>
      <div className="pt-8 lg:pb-16 sm:pb-18 pb-20 flex">
        <div className="m-auto lg:w-4/5 sm:w-[90%] w-[95%]">
          <div className="py-2">
            <h3 className="text-center text-base font-bold">Loyalty Points</h3>

            <h5 className="lg:text-4xl sm:text-4xl text-3xl text-center ">
              Use your loyalty points to buy products
            </h5>
            <div className="flex justify-center py-2">
              <div className="h-[0.2rem] w-[8rem] my-2 bg-primary"></div>
            </div>
          </div>

          <div className="py-4">
            <div className="flex">
              <div className="relative m-auto w-3/4 lg:h-[150px] sm:h-[150px] h-[100px]">
                <Image
                  src="/assets/icons/logo1.png"
                  alt="logo"
                  className="object-contain"
                  fill
                />
              </div>
            </div>

            <div className="py-2">
              <div className="py-4">
                <div>
                  <p className="text-2xl text-center">
                    Your have{" "}
                    <span className="text-primary font-bold">2000</span> points
                  </p>
                </div>
              </div>

              <div className="py-2">
                <div className="flex justify-center">
                  <ButtonComponent
                    text={"Use Points"}
                    type={"button"}
                    size={"lg"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;
