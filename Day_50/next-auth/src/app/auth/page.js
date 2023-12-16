"use client";
import React from "react";
import "./auth.scss";
import {
  GithubSignInButton,
  GoogleSignInButton,
} from "@/components/AuthButton/AuthButton";

import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function AuthPage() {
  // const router = useRouter();
  // if (hasCookie("page") && hasCookie("isLogin")) {
  //   router.push(`/${getCookie("page")}`);
  // }
  return (
    <div className="auth">
      <span>© 2023 Huy portfolio</span>
      <p>Xin chào, mình là Huy, đây là trang cá nhân của mình.</p>
      <div>
        <span>Đăng nhập</span>
        <GoogleSignInButton />
        <GithubSignInButton />
        <blockquote>
          "Đăng nhập để liên hệ, bình luận và khám phá nhiều tính năng thú vị
          khác."
        </blockquote>
      </div>
    </div>
  );
}

export default AuthPage;
