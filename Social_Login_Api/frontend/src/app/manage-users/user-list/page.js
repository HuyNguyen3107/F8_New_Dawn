"use client";
import React from "react";
import { getUsers, deleteUser, deleteUsers } from "@/utils/user";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../../../assets/scss/userList.scss";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [idList, setIdList] = useState([]);
  const handleGetUserList = async (accessToken) => {
    const users = await getUsers(accessToken);
    if (users) {
      setUserList(users);
    } else {
      localStorage.removeItem("accessToken");
    }
  };
  const handleDelete = async (e) => {
    const id = e.target.id;
    const user = await deleteUser(accessToken, id);
    if (user) {
      alert("success");
    } else {
      localStorage.removeItem("accessToken");
    }
  };
  const handleCheck = (e) => {
    let temp;
    if (e.target.checked) {
      if (!idList.includes(e.target.id)) {
        temp = idList;
        temp.push(e.target.id);
        setIdList(temp);
      }
    } else {
      if (idList.includes(e.target.id)) {
        temp = idList.filter((id) => +id !== +e.target.id);
        setIdList(temp);
      }
    }
  };
  const handleDeleteUsers = async () => {
    if (idList.length) {
      const res = await deleteUsers(accessToken, { idList });
      if (res) {
        alert("success");
      } else {
        localStorage.removeItem("accessToken");
      }
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
                  <button
                    id={user.id}
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id={user.id}
                    onChange={(e) => {
                      handleCheck(e);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleDeleteUsers()}>Delete Users</button>
      <Link className="text-amber-300" href="/manage-users">
        Back
      </Link>
    </div>
  );
}

export default UserList;
