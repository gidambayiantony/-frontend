"use client";

import React, { useEffect } from "react";

const ServiceWorker = () => {
  const publicVapidKey =
    "BH0MtpHAEnVacRrstRBYcn8Mot0rJrtWeoNk9TVeVwEtgjDmzJC1iMbH8eSLNlyz7Q1aGhVeCuFeXsTD2CYrqIA";

  async function handleSend() {
    // register service worker
    const register = await navigator.serviceWorker.register("/worker.js", {
      scope: "/",
    });

    if (register.active) {
      // register push
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await fetch("https://yookatale-server-app.onrender.com/admin/web_push", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json",
        },
      });
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  useEffect(() => {
    if ("serviceWorker" in navigator)
      handleSend().catch((err) => console.log({ err }));
  }, []);

  return <></>;
};

export default ServiceWorker;
