"use client";

import { useToast } from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import {
  useNewOrderMutation,
  useNewScheduleMutation,
} from "@slices/productsApiSlice";
import { FormatCurr } from "@utils/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TabThree = ({ updateTabIndex, data }) => {
  const [isLoading, setIsLoading] = useState(false);

  const chakraToast = useToast();

  const [createSchedule] = useNewScheduleMutation();
  const router = useRouter();

  const handleTabThree = async () => {
    const confirmInput = document.querySelector("input#confirm");

    if (!confirmInput.checked)
      return chakraToast({
        title: "Error",
        description: "Please confirm checkout information",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    // create order
    try {
      setIsLoading((prevState) => (prevState ? false : true));

      const res = await createSchedule({
        user: data.personalInfo,
        products: data.Products,
        deliveryDays: data.deliveryDays,
        deliveryTime: data.deliveryTime,
        repeatSchedule: data.repeatSchedule,
        order: {
          payment: { paymentMethod: "", transactionId: "" },
          deliveryAddress: data.deliveryAddress,
          specialRequests: data.specialRequests,
          orderTotal: data.orderTotal,
        },
      }).unwrap();

      if (res.status == "Success") {
        router.push(`/payment/${res.data.Order}`);
      }
    } catch (err) {
      // set loading to be false
      setIsLoading((prevState) => (prevState ? false : true));

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
  return (
    <div>
      <div className="py-2">
        <h3 className="text-lg font-bold">Order Summary</h3>
      </div>

      <div className="py-2">
        <div className="">
          <h3 className="text-lg">Products</h3>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 max-h-[200px] overflow-y-auto">
          {data.Products.map((product, index) => (
            <div className="border-2 border-light rounded-md p-2" key={index}>
              <h3 className="text-lg">{product.name}</h3>
              <p className="">
                {product.quantity} {product?.units ? product?.units : "Kg"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-2">
        <div className="">
          <h3 className="text-lg">Delivery Address</h3>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-2 gap-4">
          <div className="border-2 border-light rounded-md p-2">
            <h3 className="font-bold">Address 1</h3>
            <p className="">
              {data.deliveryAddress.address1
                ? data.deliveryAddress.address1
                : ""}
            </p>
          </div>

          <div className="border-2 border-light rounded-md p-2">
            <h3 className="font-bold">Address 2</h3>
            <p className="">
              {data.deliveryAddress.address2
                ? data.deliveryAddress.address2
                : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <div className="">
          <h3 className="text-lg">Special Request</h3>
        </div>

        <div className="py-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <p className="font-bold">Peel food</p>
            <p>{data.specialRequests.peeledFood ? "Yes" : "No"}</p>
          </div>

          {data.specialRequests.moreInfo && (
            <div className="py-1">
              <p className="font-bold">More Information</p>
              <p>{data.specialRequests.moreInfo}</p>
            </div>
          )}
        </div>
      </div>

      <div className="py-2">
        <div className="">
          <h3 className="text-lg">Delivery days</h3>
        </div>

        <div className="py-2 grid lg:grid-cols-7 grid-cols-3 gap-4">
          {data.deliveryDays.map((item, index) => (
            <p
              key={index}
              className="py-1 px-2 border-2 border-light rounded-md"
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-2 gap-4">
        <div className="py-2">
          <div className="">
            <h3 className="text-lg">Delivery Time</h3>
          </div>

          <div className="py-2">
            <p className="py-1 px-2 border-2 border-light rounded-md w-fit">
              {data.deliveryTime}
            </p>
          </div>
        </div>
      </div>

      <div className="py-2 border-t-2 border-t-light">
        {data.repeatSchedule && (
          <div className="py-2">
            <p className="text-lg">
              You're schedule will be repeated every week for a month
            </p>
          </div>
        )}

        <div className="py-1">
          <p className="text-lg">
            Total:{" "}
            <span className="font-bold">UGX {FormatCurr(data.orderTotal)}</span>
          </p>
        </div>
      </div>

      <div className="py-2">
        <div>
          <input type="checkbox" name="confirm" id="confirm" className="mr-2" />{" "}
          Confirm order and proceed to check out
        </div>
      </div>

      <div className="py-2">
        <div className="flex justify-between">
          <div onClick={() => updateTabIndex(1)}>
            <ButtonComponent
              type={"button"}
              text={"back"}
              icon={<ChevronLeft size={20} />}
              size={"default"}
            />
          </div>

          <div onClick={handleTabThree}>
            <ButtonComponent
              type={"button"}
              text={"Proceed to checkout"}
              icon={
                isLoading ? <Loader2 size={20} /> : <ChevronRight size={20} />
              }
              size={"default"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabThree;
