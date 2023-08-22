"use client";

import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const FlutterwavePayment = ({ data, callback, closeComponent }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const router = useRouter();

  const flwConfig = {
    public_key: "FLWPUBK_TEST-07d1b505448d1358e34d597736dd6b8a-X",
    tx_ref: Date.now(),
    amount: 3000,
    currency: "UGX",
    payment_options:
      data?.paymentMethod == "card" ? "card" : "mobilemoneyuganda",
    customer: {
      email: `${userInfo?.email}`,
      phone_number: `${userInfo?.phone}`,
      name: `${userInfo?.firstname} ${userInfo?.lastname}`,
    },
    customizations: {
      title: data.title,
      description: data?.message,
      logo: "https://yookatale-server-app.onrender.com/uploads/logo1.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(flwConfig);

  if (!userInfo) return router.push("/");

  handleFlutterPayment({
    callback: async (response) => {
      if (response?.status == "successful") {
        callback({
          status: "success",
          message: "",
          payment: {
            transactionID: response?.transaction_id,
            transactionTxRef: response?.tx_ref,
          },
        });
      } else {
        callback({ status: "error", message: "" });
      }

      closePaymentModal();
    },
    onClose: () => {
      closeComponent((prev) => false);
    },
  });

  return <div></div>;
};

export default FlutterwavePayment;
