import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function ContactPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");
  return <div>ContactPage</div>;
}

export default ContactPage;
