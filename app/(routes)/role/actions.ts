"use server";

import { Role } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function selectRole(role: Role) {
  // Set the cookie (valid for 7 days, for example)
  const cookies1 = await cookies();
  cookies1.set("user_role", role, {
    secure: true,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  // Redirect the user to questions immediately after selection
  redirect("/questions");
}