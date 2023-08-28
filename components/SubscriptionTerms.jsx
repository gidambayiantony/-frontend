import { X } from "lucide-react";
import React from "react";

const SubscriptionTerms = ({ handleModalClose }) => {
  return (
    <div>
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => handleModalClose((prev) => (prev ? false : true))}
      >
        <X size={30} />
      </div>

      <div className="py-3">
        <h3 className="text-2xl font-bold">
          YooKatale Premium Promotional Offer Terms
        </h3>
      </div>

      <p>
        Welcome to YooKatale Premium Promotional Offer Terms. On this page, you
        can find and read the terms and conditions that apply to the promotional
        offer that you've signed up for.
      </p>

      <p className="text-lg font-bold m-2">
        PLEASE READ THESE TERMS CAREFULLY AND IN FULL. THEY CONTAIN CONDITIONS
        AND RESTRICTIONS ON THE AVAILABILITY OF YOOKATALE PREMIUM PROMOTIONAL
        OFFERS AND INFORMATION ON WHAT HAPPENS AFTER YOUR YOOKATALE PREMIUM
        PROMOTIONAL OFFER ENDS.
      </p>

      <div className="py-2">
        <h3 className="font-bold">Introduction</h3>
        <p>
          YooKatale Premium Promotional Offers (each a "Promotional Offer") are
          made available by YooKatale subject to YooKatale Terms and Conditions
          of Use ("YooKatale Terms of Use")
        </p>
      </div>

      <div className="py-2">
        <p>
          Each Promotional Offer is made available in connection with a form of
          Paid Subscription (as defined in the YooKatale Terms of Use), such as
          YooKatale Premium, YooKatale Duo Premium as the case may be and
          subject to the offer as advertised (each a "YooKatale Premium
          Service").
        </p>
        <p>
          Subject to the YooKatale Premium Service advertised in a Promotional
          Offer, these terms and conditions (the "Promotional Offer Terms")
          supplement and incorporate by reference the additional terms and
          conditions corresponding to that particular YooKatale Premium Service,
          as shown below:
        </p>
      </div>

      <div className="py-2">
        <p>
          Terms and conditions for the YooKatale Premium Service referenced in a
          Promotional Offer YooKatale premium
        </p>
        <h3 className="font-bold">YooKatale Duo Premium</h3>

        <p>
          For any Promotional Offer, in the event of any inconsistency between
          these Promotional Offer Terms and the relevant corresponding terms and
          conditions referenced in the above table, these Promotional Offer
          Terms will prevail.
        </p>

        <h3 className="font-bold">The Promotional Offer</h3>
        <p>
          Each Promotional Offer provides access to the YooKatale Premium
          Service advertised:
        </p>
      </div>

      <div className="py-2">
        <p>A. at the price advertised (if any); and</p>

        <p>
          B. for an initial introductory delivery period as further described in
          terms, beginning the moment that you confirm your acceptance of the
          Promotional Offer advertised by submitting valid payment details that
          are accepted by YooKatale (the "Promotional Period").
        </p>

        <p>
          By submitting your payment details, you (i) confirm your acceptance of
          the Promotional Offer advertised; (ii) accept and agree to these
          Promotional Offer Terms, including the relevant terms and conditions
          corresponding to the YooKatale Premium Service advertised (as
          described above); and (iii) acknowledge and agree to YooKatale Terms
          of Use. All information collected by YooKatale under any Promotional
          Offer will be processed and used in accordance with our Privacy
          Policy. Unless otherwise advertised, Promotional Offers do not permit
          or provide access to any third party goods or services far from those
          stipulated.{" "}
        </p>
      </div>

      <div className="py-2">
        <h3 className="font-bold">Eligibility.</h3>
        <p>
          In order to be eligible for a Promotional Offer, users must satisfy
          all of the following conditions (each an "Eligible User"):
        </p>
      </div>

      <div className="py-2">
        <p>
          1. Unless you are subscribing to a Promotional Offer that is
          advertised as available to past subscribers to YooKatale Premium
          Service, you must be a new subscriber to any and all forms of
          YooKatale Premium Service or the Unlimited service (as defined in
          YooKatale Terms of Use) and not have subscribed to, or accepted a
          trial of, either the YooKatale Premium or Duo Premium Service at any
          time in the past.
        </p>
        <p>
          2. If you are subscribing to a Promotional Offer that is advertised as
          available only to past subscribers to a YooKatale Premium Service, you
          must have been a subscriber to the relevant YooKatale Premium Service
          (as advertised) whose subscription expired before the date advertised.
        </p>
        <p>
          3. In respect of Promotional Offers for YooKatale Premium , YooKatale
          Duo Premium : the additional eligibility requirements set out in the
          corresponding terms and conditions for those respective subscription
          plans.
        </p>
        <p>
          4. Unless otherwise advertised, provide YooKatale with a valid and
          current payment method that is approved by YooKatale (prepaid cards
          and Yookatale gift cards, coupons are not valid forms of payment).
        </p>
        <p>
          5. Unless otherwise advertised, provide the payment method above
          directly to YooKatale and not through a third party (e.g., not through
          a cable or telecommunications provider or other distributor).
        </p>
        <p>
          6. Additional eligibility requirements (if any) as advertised from
          time-to-time in connection with a Promotional Offer.
        </p>
      </div>

      <p>
        Eligible Users may accept a Promotional Offer once - previous users may
        not redeem the offer again.
      </p>

      <div className="py-2">
        <h3 className="font-bold">Availability.</h3>

        <p>
          A Promotional Offer must be accepted before the applicable expiration
          date advertised, if any. Except where prohibited by law, YooKatale
          reserves the right to modify, suspend or terminate a Promotional Offer
          at any time and for any reason, in which case we will not honour
          subsequent Promotional Offer enrollments.
        </p>

        <h3 className="font-bold">Duration and cancellation.</h3>
        <p>
          In the case of any Promotional Offer, the corresponding Promotional
          Period shall continue for the period as advertised.
        </p>

        <p>
          Unless you cancel a Promotional Offer before the end of the
          Promotional Period, you will automatically become a recurring
          subscriber to the type of YooKatale Premium Service that you chose to
          sign up to under the Promotional Offer and the payment method you
          provided will automatically be charged the then-current monthly price.
          Any time-capped features of that YooKatale Premium Service will be
          reduced by the length of the Promotional Period.
        </p>

        <p>
          If you cancel a Promotional Offer during the Promotional Period, you
          will lose access to YooKatale Premium Service and your YooKatale
          account will switch to YooKatale Free account at the end of the
          Promotional Period. To cancel, you must log into your YooKatale
          account and follow the prompts on the Account page or contact
          info@yookatale.com and follow the instructions.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionTerms;
