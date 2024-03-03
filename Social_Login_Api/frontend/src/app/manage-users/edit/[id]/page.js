"use client";
import React from "react";
import { editUser } from "@/utils/user";
import { useEffect, useState } from "react";
import Link from "next/link";
function Edit({ params }) {
  const { id } = params;
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async () => {
    const user = await editUser(localStorage.getItem("accessToken"), id, {
      name,
    });
    if (user) {
      window.location.href = "/manage-users/user-list";
    } else {
      localStorage.removeItem("accessToken");
    }
  };
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Your Name"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button>Change</button>
      <Link href="/manage-users/user-list">Back</Link>
    </form>
  );
}

export default Edit;
