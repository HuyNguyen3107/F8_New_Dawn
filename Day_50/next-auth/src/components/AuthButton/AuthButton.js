"use client";

import { deleteCookie, setCookie } from "cookies-next";
import { signIn, signOut } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    setCookie("isLogin", "login");
    signIn("google");
  };
  return (
    <button onClick={handleClick}>
      <i className="pi pi-google"></i>
      Đăng nhập với Google
    </button>
  );
}

export function GithubSignInButton() {
  const handleClick = () => {
    setCookie("isLogin", "login");
    signIn("github");
  };
  return (
    <button onClick={handleClick}>
      <i className="pi pi-github"></i>
      Đăng nhập với Github
    </button>
  );
}

export function GoogleLoginButton() {
  const handleClick = () => {
    setCookie("isLogin", "login");
    signIn("google");
  };
  return (
    <button onClick={handleClick} className="google-login">
      <i className="pi pi-google"></i>
      Chưa Đăng Ký
    </button>
  );
}

export function GithubLoginButton() {
  const handleClick = () => {
    setCookie("isLogin", "login");
    signIn("github");
  };
  return (
    <button onClick={handleClick} className="github-login">
      <i className="pi pi-github"></i>
      Chưa Đăng Ký
    </button>
  );
}

export function SignOutButton() {
  const handleClick = () => {
    deleteCookie("isLogin");
    signOut();
  };

  return (
    <button className="logout" onClick={handleClick}>
      Đăng xuất
    </button>
  );
}
