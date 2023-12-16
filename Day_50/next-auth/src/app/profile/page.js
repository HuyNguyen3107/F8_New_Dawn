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
import Note from "./components/Note";
import UserInfo from "./components/UserInfo";
import { headers } from "next/headers";

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");
  console.log(session);
  const headerList = headers();
  console.log(headerList);

  return (
    <div className="profile">
      <div>
        <div>
          <UserInfo session={session} />
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
      <Note />
    </div>
  );
}

export default ProfilePage;
