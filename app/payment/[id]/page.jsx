"use client";

import { useToast } from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import FlutterwavePayment from "@components/FlutterwavePayment";
import PaymentCard from "@components/PaymentCard";
import {
  useOrderMutation,
  useOrderUpdateMutation,
} from "@slices/productsApiSlice";
import { FormatCurr } from "@utils/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Payment = ({ params }) => {
  const [Order, setOrder] = useState({});
  const [paymentDisplay, setPaymentDisplay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [fetchOrder] = useOrderMutation();
  const [updateOrder] = useOrderUpdateMutation();

  const chakraToast = useToast();
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();

  const handleDataFetch = async () => {
    const res = await fetchOrder(params.id).unwrap();

    if (res.data.status != "") router.push("/");

    if (res.status == "Success") setOrder({ ...res.data });
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  // function to display payment component
  const handlePayment = async () => {
    setIsLoading((prev) => (prev ? false : true));

    if (paymentMethod == "") {
      setIsLoading((prev) => (prev ? false : true));

      return chakraToast({
        description: "Please choose a payment option",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }

    setPaymentDisplay((prev) => true);
  };

  // callback function that will be called when payment is successfully or failed and will update database
  const handleCallback = async (param) => {
    setPaymentDisplay((prev) => false);

    if (param.status == "error")
      return chakraToast({
        description:
          param.message || "Payment failed. Please refresh page and try again",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    try {
      const res = await updateOrder({
        data: {
          payment: { ...param.payment, paymentMethod },
          order: params.id,
          schema: "schedule",
          user: userInfo,
        },
      }).unwrap();

      setIsLoading((prev) => (prev ? false : true));

      if (res?.status == "Success") {
        chakraToast({
          description:
            "Payment successful, you're order has been placed. You will receive an email confirmation shortly",
          status: "success",
          duration: 5000,
          isClosable: false,
        });

        router.push("/");
      }
    } catch (err) {
      setIsLoading((prev) => (prev ? false : true));

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
    <div className="pt-[3rem] pb-[5rem]">
      <div className="flex">
        <div className="m-auto lg:w-3/5 sm:w-3/5 w-4/5 bg-white shadow-md px-6 py-10 min-h-[300px]">
          {Order?._id ? (
            <>
              <div className="py-2">
                <h3 className="text-center text-primary text-3xl">Checkout</h3>
              </div>

              <div className="py-2">
                <h3 className="text-2xl text-center">
                  Amount to be paid{" "}
                  <span className="text-primary font-bold">
                    UGX {FormatCurr(Order?.total)}
                  </span>
                </h3>
              </div>

              <div className="py-6 hidden">
                <div className="py-1">
                  <h3 className="text-center text-[1.3rem]">
                    Select payment option
                  </h3>
                </div>

                <div className="py-2">
                  <div className="flex justify-center items-center gap-4">
                    <PaymentCard
                      text={"Mobile Money"}
                      type={""}
                      paymentMethod={"mobileMoney"}
                    />
                    <PaymentCard
                      text={"Credit/Debit Card"}
                      type={""}
                      paymentMethod={"card"}
                    />
                  </div>
                </div>
              </div>

              <div className="py-4">
                <div className="py-1">
                  <h3 className="text-center text-[1.3rem]">
                    Select payment option
                  </h3>
                </div>

                <div className="py-2 flex justify-center">
                  <select
                    name="paymentOption"
                    id=""
                    className="border-2 border-light py-2 px-4 rounded-md cursor-pointer"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Select payment method</option>
                    <option value="mobileMoney">Mobile Money</option>
                    <option value="card">Debit/Credit Card</option>
                    <option value="cash">Cash on delivery</option>
                  </select>
                </div>
              </div>

              <div className="py-2 flex justify-center items-center">
                <div onClick={handlePayment}>
                  <ButtonComponent
                    text={"Make Payment"}
                    size={"lg"}
                    type={"button"}
                    icon={isLoading && <Loader2 size={20} />}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center relative h-[250px]">
              <Loader2 size={30} className="text-primary absolute top-[45%]" />
            </div>
          )}
        </div>
      </div>

      {/* // displaying payment component */}
      {paymentDisplay && (
        <FlutterwavePayment
          data={{
            total: Order?.total,
            paymentMethod: paymentMethod,
            title: "Delivery Schedule",
            message: "You are making payment for the delivery schedule service",
          }}
          callback={handleCallback}
          closeComponent={setPaymentDisplay}
        />
      )}
    </div>
  );
};

export default Payment;
