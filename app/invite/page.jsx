"use client"
import React, { useState } from 'react';
import ButtonComponent from '@components/Button';
import Loader from '@components/Loader';

const InviteFriend = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Invite a Friend</h1>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring focus:border-blue-500"
        type="text"
        placeholder="Enter friend's email or phone number"
      />
      <ButtonComponent
        size="regular"
        type="submit"
        text={isLoading ? "Sending Invite" : "Send Invite"}
        onClick={handleInvite}
        disabled={isLoading}
      >
        {isLoading && <Loader size={20} />}
      </ButtonComponent>
    </div>
  );
};

export default InviteFriend;
