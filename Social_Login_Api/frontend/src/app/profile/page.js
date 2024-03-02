"use client";
import getProfile from "../../utils/profile";
import { useEffect, useState } from "react";

import Link from "next/link";

function Profile() {
  const [profile, setProfile] = useState();
  const handleGetProfile = async (accessToken) => {
    const myProfile = await getProfile(accessToken);
    if (myProfile) {
      setProfile(myProfile);
    } else {
      localStorage.removeItem("accessToken");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      handleGetProfile(localStorage.getItem("accessToken"));
    }
  }, []);
  return (
    <div className="flex items-center flex-col gap-4 mt-4">
      <h1>{profile?.name}</h1>
      <h2>{profile?.email}</h2>
      <table className="table-auto" cellSpacing="0" cellPadding="10">
        <thead>
          <tr>
            <th>Browser</th>
            <th>Operating_System</th>
            <th>Device_Type</th>
            <th>User_Agent</th>
          </tr>
        </thead>
        <tbody>
          {profile?.devices?.map((device, index) => {
            return (
              <tr key={index + 1}>
                <td>{device.browser}</td>
                <td>{device.operating_system}</td>
                <td>{device.device_type}</td>
                <td>{device.user_agent}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link className="text-amber-300" href="/">
        Home
      </Link>
    </div>
  );
}

export default Profile;
