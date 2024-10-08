import RoleList from "@/components/dashboard/RoleList";
import UserList from "@/components/dashboard/UserList";
import { getRolesList } from "@/lib/server-function/role";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export default async function page() {
  const roles: any = await getRolesList();
  return (
    <div>
      <div className="flex justify-end w-full mb-3">
        <Link href={"/admin/role/create"}>
          <Button variant="contained">Create Role</Button>
        </Link>
      </div>
      <RoleList roleData={roles?.data?.roles} />
    </div>
  );
}
