import React from "react";
import Link from "next/link";

function UserManagement() {
  return (
    <div className="flex items-center flex-col gap-4 mt-4">
      <Link className="text-amber-300" href="/manage-users/user-list">
        User List
      </Link>
      <Link className="text-amber-300" href="/">
        Home
      </Link>
    </div>
  );
}

export default UserManagement;
