import UserList from "@/components/dashboard/UserList";
import { getUserList } from "@/lib/server-function/user";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export default async function page() {
  const users: any = await getUserList();
  return (
    <div>
      <div className="flex justify-end w-full mb-3">
        <Link href={"/admin/user/create"}>
          <Button variant="contained">Create User</Button>
        </Link>
      </div>
      <UserList usersData={users?.data?.users} />
    </div>
  );
}
