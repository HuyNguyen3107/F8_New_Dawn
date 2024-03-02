"use client";
import { Button } from "@nextui-org/react";
import { handleCallback } from "../../../../utils/login";
import React, { useEffect } from "react";

export default function Auth({ params }) {
  const { provider } = params;
  const getAccessToken = async () => {
    const accessToken = await handleCallback(provider, window.location.href);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      window.location.href = "/";
    }
  };
  useEffect(() => {
    getAccessToken();
  }, []);
  return (
    <>
      <h1>Redirecting...</h1>
      <Button color="warning" onClick={() => (window.location.href = "/")}>
        Go Home!
      </Button>
    </>
  );
}
