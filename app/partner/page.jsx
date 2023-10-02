"use client";
import React from "react";
import PartnerComponent from "@components/Partner";
import QuestionsAndAnswers from "@components/Questions";

const Partner = () => {
  const handleFormSubmit = async (message) => {
    try {
      console.log(message);

      if (message === "Data submitted successfully") {
      } else if (message === "Error submitting data") {
      } else {
        console.error("Unexpected submission outcome:", message);
      }
    } catch (error) {
      console.error(
        "An error occurred while handling the submission outcome:",
        error
      );
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2 p-4">
        <QuestionsAndAnswers />
      </div>

      <div className="w-full md:w-1/2 p-4">
        <PartnerComponent onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Partner;
