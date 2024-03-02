"use client";
import React from "react";
import { getUsers } from "@/utils/user";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../../../assets/scss/userList.scss";

function UserList() {
  const [userList, setUserList] = useState();
  const handleGetUserList = async (accessToken) => {
    const users = await getUsers(accessToken);
    if (users) {
      setUserList(users);
    } else {
      localStorage.removeItem("accessToken");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      handleGetUserList(localStorage.getItem("accessToken"));
    }
  }, []);
  return (
    <div className="flex items-center flex-col gap-4 mt-4">
      <h1 className="text-5xl">User List</h1>
      <table className="table-auto" cellSpacing="0" cellPadding="10">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user, index) => {
            return (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="action">
                  <Link href={"/manage-users/user-information/" + user.id}>
                    Detail
                  </Link>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link className="text-amber-300" href="/manage-users">
        Back
      </Link>
    </div>
  );
}

export default UserList;
