import React from "react";
import "./Header.scss";
import Navigation from "../Navigation/Navigation";
import Link from "next/link";

function Header() {
  return (
    <header id="header">
      <div>
        <div className="logo">
          <Link href={"/"}>
            <span>Mindmap Flow</span>
          </Link>
        </div>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
