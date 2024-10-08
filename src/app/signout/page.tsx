"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { CircularProgress } from "@mui/material";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    // Sign out the user
    signOut({ redirect: true });

  }, [router]);

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center">
      <CircularProgress />
    </div>
  );
}
