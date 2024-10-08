"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { deleteUser, getUserList } from "@/lib/server-function/user";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function UserList({ usersData }: { usersData: any }) {
  const [userList, setUserList] = React.useState(usersData);
  const deleteHandler = async (id: string) => {
    await deleteUser(id);
    const users: any = await getUserList();
    setUserList(users.data.users);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone No</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.phone_no}</TableCell>
              <TableCell >{row.role.name}</TableCell>
              <TableCell >
                <div className="flex w-full gap-3 items-center h-full ">
                  <Link
                    href={`/admin/user/edit/${row.id}`}
                    className="border p-2 text-gray-800 rounded"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </Link>
                  <div
                    onClick={() => deleteHandler(row.id as string)}
                    className="border p-2 text-gray-800 rounded cursor-pointer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
