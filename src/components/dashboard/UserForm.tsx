"use client";
import { createUser, updateUser } from "@/lib/server-function/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(3, "Name Should Contain Minimum 3 Letters"),
  phone_no: z.string().min(3, "Phone No Should Contain Minimum 3 Letters"),
  roleId: z.number().optional(),
  password: z
    .string()
    .max(20, { message: "Password must be at most 20 characters" })
    .optional(),
});
type UserSchemaType = z.infer<typeof UserSchema>;

export default function UserForm({
  roles,
  id,
  user,
}: {
  roles: any;
  id?: string;
  user?: any;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      ...user,
      password: "",
    },
  });
  const [submissionError, setSubmissionError] = useState(null);

  const onSubmit = async (data: any) => {
    if (id) {
      if (data.password === "") {
        delete data.password;
      }
      const response: any = await updateUser(id, data);
      if (response.status == "success") {
        router.push("/admin/user");
      } else {
        setSubmissionError(response.message);
      }
    } else {
      const response: any = await createUser(data);
      if (response.status == "success") {
        router.push("/admin/user");
      } else {
        setSubmissionError(response.message);
      }
    }
  };
  return (
    <form className="pb-2" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-2xl font-bold text-center">
        {id ? "Edit" : "Create"} User
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
          <TextField
            variant="outlined"
            {...register("phone_no")}
            error={errors?.phone_no?.message ? true : false}
            helperText={errors?.phone_no?.message}
            placeholder="Enter Phone No Here"
            className="w-full"
          />
        </div>

        <div>
          <TextField
            variant="outlined"
            {...register("email")}
            error={errors?.email?.message ? true : false}
            helperText={errors?.email?.message}
            placeholder="Enter Username / Email Here"
            className="w-full"
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              className="w-full"
              value={watch("roleId")}
              error={errors?.roleId?.message ? true : false}
              {...register("roleId")}
              label="Role"
            >
              {roles.map((role: any) => (
                <MenuItem value={role.id}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            variant="outlined"
            placeholder="Password"
            error={errors?.password?.message ? true : false}
            helperText={errors?.password?.message}
            type="password"
            {...register("password")}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="contained" type="submit" className="mt-3 ">
          {id ? "Edit" : "Create"} User
        </Button>
      </div>
    </form>
  );
}
