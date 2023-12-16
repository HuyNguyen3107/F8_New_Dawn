"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { signIn, signOut } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    setCookie("currentLogin", "google");
    // setCookie("googleLogged", "logged");
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
    setCookie("currentLogin", "github");
    // setCookie("githubLogged", "logged");
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
  // const google = getCookie("googleLogged");
  const handleClick = () => {
    setCookie("currentLogin", "google");
    setCookie("isLogin", "login");
    signIn("google");
  };
  return (
    <button onClick={handleClick} className="google-login">
      <i className="pi pi-google"></i>
      {/* {google ? "Đã đăng nhập" : "Chưa đăng ký"} */}
      Chưa đăng ký
    </button>
  );
}

export function GithubLoginButton() {
  // const github = getCookie("githubLogged");
  const handleClick = () => {
    setCookie("currentLogin", "github");
    setCookie("isLogin", "login");
    signIn("github");
  };
  return (
    <button onClick={handleClick} className="github-login">
      <i className="pi pi-github"></i>
      {/* {github ? "Đã đăng nhập" : "Chưa Đăng Ký"} */}
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
