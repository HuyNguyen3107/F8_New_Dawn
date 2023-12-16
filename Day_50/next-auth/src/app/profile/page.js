import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {
  GithubLoginButton,
  GoogleLoginButton,
  SignOutButton,
} from "@/components/AuthButton/AuthButton";
import "./profile.scss";
import { Divider } from "@nextui-org/react";

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");
  console.log(session.user);
  console.log("oklllllll");
  return (
    <div className="profile">
      <div>
        <div>
          <div className="user-info">
            <div className="user-img">
              <img src={session.user.image} alt="" />
            </div>
            <div className="user-detail">
              <span className="user-name">{session.user.name}</span>
              <span className="user-email">{session.user.email}</span>
            </div>
          </div>
          <div className="auth-btn">
            <div className="login-group">
              <GithubLoginButton />
              <GoogleLoginButton />
            </div>
            <div className="rest">
              <SignOutButton />
            </div>
          </div>
        </div>
        <Divider />
      </div>
      <div className="posts">
        <span>Bạn chưa xem bài viết nào</span>
        <Divider />
      </div>
      <div className="note">
        <span>© 2023 Huy portfolio</span>
        <p>Xin chào, mình là Huy, đây là trang cá nhân của mình.</p>
      </div>
    </div>
  );
}

export default ProfilePage;
