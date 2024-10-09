"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Input,
  TextField,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import z from "zod";

const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
});
type SignInSchemaType = z.infer<typeof SignInSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({ resolver: zodResolver(SignInSchema) });
  const [submissionError, setSubmissionError] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("error")) {
      if (searchParams.get("error") == "AccessDenied") {
        setSubmissionError("This Account Does Not Exist");
      } else {
        setSubmissionError("Invalid Username or Password");
      }
    }
  }, [searchParams]);
  const onSubmit = async (data: any) => {
    const result = await signIn("credentials", {
      redirect: true,
      ...data,
    });
    if (result) {
      setSubmissionError("Invalid Username or Password");
    }
  };
  return (
    <div className="max-w-lg mx-auto min-h-[100vh] flex items-center">
      <Card className="w-full">
        <CardContent>
          <form className="pb-2" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-2xl font-bold text-center">Login</p>
            <div
              onClick={() => signIn("google")}
              className="flex gap-5 py-3 px-5 border cursor-pointer mt-3 text-2xl font-bold items-center justify-center rounded"
            >
              <FcGoogle className="text-4xl" /> Continue With Google
            </div>
            <div
              onClick={() => signIn("azure-ad")}
              className="flex gap-5 py-3 px-5 border cursor-pointer mt-3 text-2xl font-bold items-center justify-center rounded"
            >
              <FaMicrosoft className="text-4xl" /> Continue With Microsoft
            </div>
            {submissionError && (
              <Alert severity="error" className="mt-5">
                {submissionError}
              </Alert>
            )}
            <div className="mt-5">
              <TextField
                variant="outlined"
                {...register("email")}
                error={errors?.email?.message ? true : false}
                helperText={errors?.email?.message}
                placeholder="Enter Username / Email Here"
                className=" w-full"
              />
            </div>
            <div className="mt-5">
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
            <div className="mt-5">
              <Button variant="contained" type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
