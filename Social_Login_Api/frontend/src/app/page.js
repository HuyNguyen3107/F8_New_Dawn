"use client";
import { Button, Tooltip } from "@nextui-org/react";
import { handleGetRedirect } from "../utils/login";
import getProfile from "../utils/profile";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import Link from "next/link";

export default function Home() {
  const [profile, setProfile] = useState();
  const handleRedirect = async (provider) => {
    const redirect = await handleGetRedirect(provider);
    if (redirect) {
      window.location.href = redirect;
    }
  };
  const handleLogin = async (accessToken) => {
    const profile = await getProfile(accessToken);

    if (profile) {
      setProfile(profile);
    } else {
      localStorage.removeItem("accessToken");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      handleLogin(localStorage.getItem("accessToken"));
    }
  }, []);
  return (
    <div className="flex items-center flex-col gap-4 mt-4">
      {!profile ? (
        <>
          <h1 className="text-5xl">Welcome</h1>
          <Button
            className="bg-red-700 text-white"
            onClick={() => handleRedirect("google")}
          >
            Nút này để đăng nhập với Google
          </Button>
          <Button
            className="bg-lime-500 text-white"
            onClick={() => handleRedirect("github")}
          >
            Nút này để đăng nhập với Github
          </Button>
          <ThemeSwitcher />
        </>
      ) : (
        <>
          <h1 className="text-5xl">Home Page</h1>
          <Link className="text-amber-300" href="/manage-users">
            Manage Users
          </Link>
          <Link className="text-amber-300" href="/profile">
            Profile
          </Link>
        </>
      )}
    </div>
  );
}
