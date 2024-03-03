"use client";
import React from "react";
import { getUser } from "@/utils/user";
import { useEffect, useState } from "react";
import Link from "next/link";

function UserInfo({ params }) {
  const [user, setUser] = useState();
  const handleGetUser = async (accessToken) => {
    const { id } = params;
    const user = await getUser(accessToken, id);
    if (user) {
      setUser(user);
    } else {
      localStorage.removeItem("accessToken");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      handleGetUser(localStorage.getItem("accessToken"));
    }
  }, []);
  return (
    <div className="flex items-center flex-col gap-4 mt-4">
      <h1>{user?.name}</h1>
      <h2>{user?.email}</h2>
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
          {user?.devices?.map((device, index) => {
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
      <Link className="text-amber-300" href="/manage-users/user-list">
        Back
      </Link>
    </div>
  );
}

export default UserInfo;
