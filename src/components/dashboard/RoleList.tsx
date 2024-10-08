"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { deleteRole, getRolesList } from "@/lib/server-function/role";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const paginationModel = { page: 0, pageSize: 5 };

export default function RoleList({ roleData }: { roleData: any }) {
  const [roleList, setRoleList] = React.useState(roleData);
  const deleteHandler = async (id: string) => {
    await deleteRole(id);
    const roles: any = await getRolesList();
    setRoleList(roles.data.roles);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>

            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roleList.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell>
                <div className="flex w-full gap-3 items-center h-full ">
                  <Link
                    href={`/admin/role/edit/${row.id}`}
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
