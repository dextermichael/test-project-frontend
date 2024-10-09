"use client";
import { createRole, updateRole } from "@/lib/server-function/role";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const RoleSchema = z.object({
  name: z.string().min(3, "Name Should Contain Minimum 3 Letters"),
  permissions: z.array(z.any()),
});
type RoleSchemaType = z.infer<typeof RoleSchema>;

export default function RoleForm({ id, role }: { id?: string; role?: any }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RoleSchemaType>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      name: role?.name,
      permissions: role?.permissions
        ? role?.permissions.map((permission: any) => {
            return permission.module;
          })
        : [],
    },
  });
  const [submissionError, setSubmissionError] = useState(null);

  const onSubmit = async (data: any) => {
    const permissions = data.permissions.map((permission: string) => {
      return {
        module: permission,
      };
    });
    data.permissions = permissions;
    if (id) {
      const response: any = await updateRole(id, data);
      if (response.status == "success") {
        router.push("/admin/role");
      } else {
        setSubmissionError(response.message);
      }
    } else {
      const response: any = await createRole(data);
      if (response.status == "success") {
        router.push("/admin/role");
      } else {
        setSubmissionError(response.message);
      }
    }
  };
  const modules = ["User Management", "Role Management"];
  const handleChange = (event: SelectChangeEvent<typeof modules>) => {
    const {
      target: { value },
    } = event;
    setValue(
      "permissions",
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <form className="pb-2" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-2xl font-bold text-center">
        {id ? "Edit" : "Create"} Role
      </p>
      {submissionError && (
        <Alert severity="error" className="mt-5">
          {submissionError}
        </Alert>
      )}
      <div className="grid md:grid-cols-2 gap-5 my-5">
        <div>
          <TextField
            variant="outlined"
            {...register("name")}
            error={errors?.name?.message ? true : false}
            helperText={errors?.name?.message}
            placeholder="Enter Name Here"
            className="w-full"
          />
        </div>

        <div>
          <FormControl fullWidth>
            <InputLabel id="role-label">Permisions</InputLabel>
            <Select
              labelId="role-label"
              className="w-full"
              multiple
              value={watch("permissions")}
              error={errors?.permissions?.message ? true : false}
              {...register("permissions")}
              label="Permisions"
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {modules.map((role: any, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="contained" type="submit" className="mt-3 ">
          {id ? "Edit" : "Create"} Role
        </Button>
      </div>
    </form>
  );
}
