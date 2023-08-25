import { Loader, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ButtonComponent from "./Button";

const CartCard = ({
  cart,
  ReduceProductQuantity,
  IncreaseProductQuantity,
  handleDeleteCartItem,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="py-4 border-[1.9px] border-light lg:my-0 my-4 rounded-md">
      <div className="flex justify-between lg:flex-row flex-col">
        <div className="lg:w-[60%] w-full">
          <div className="flex">
            <div className="w-1/5 relative">
              <Image
                src={cart?.images}
                alt={cart?.images}
                fill
                className="object-contain"
              />
            </div>

            <div className="w-4/5">
              <div className="">
                <h3 className="text-2xl font-medium">{cart?.name}</h3>
              </div>

              <div className="">
                <h3 className="text-base font-bold text-[#7c7c7c]">
                  {cart?.category}
                </h3>
              </div>
            </div>
          </div>
          <div
            className="py-4 px-4"
            onClick={() => {
              setIsLoading((prev) => (prev ? false : true));
              handleDeleteCartItem(cart?.cartId);

              setTimeout(() => {
                setIsLoading((prev) => (prev ? false : true));
              }, 1500);
            }}
          >
            <ButtonComponent
              text={"Delete"}
              type={"button"}
              size={"regular"}
              icon={isLoading ? <Loader size={20} /> : <Trash size={20} />}
            />
          </div>
        </div>

        <div className="lg:w-[40%] w-full flex lg:py-0 py-4">
          <div className="px-2">
            <div className="flex border-[1.8px] rounded-md w-fit justify-center h-[2.5rem]">
              <div className="cursor-pointer px-2 pt-2">
                <Minus
                  size={22}
                  className="cursor-pointer"
                  onClick={() => ReduceProductQuantity(cart.cartId)}
                />
              </div>

              <div className="px-2 py-1">
                <p className="text-lg font-bold">{cart?.quantity}</p>
              </div>

              <div className="cursor-pointer px-2 pt-2">
                <Plus
                  size={22}
                  className="cursor-pointer"
                  onClick={() => IncreaseProductQuantity(cart.cartId)}
                />
              </div>
            </div>
          </div>

          <div className="mx-4 py-2">
            <h3 className="text-lg font-medium">UGX {cart?.price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
