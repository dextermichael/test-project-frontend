"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import { redirect } from "next/navigation";

export async function getRolesList() {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(`${process.env.NEXT_API_URL}/v1/roles`, {
      headers: {
        // @ts-ignore
        Authorization: "Bearer " + session.user.accessToken,
      },
      cache: "no-store",
    });
    const data = await response.json();
    if (data.status == "success") {
      return data;
    } else {
      return redirect("/signout");
    }
  }
}
export async function createRole(formdata: any) {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/v1/roles/create-role`,
      {
        method: "POST",
        headers: {
          // @ts-ignore
          Authorization: "Bearer " + session.user.accessToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      }
    );
    const data = await response.json();

    return data;
  }
}

export async function getRoleById(id: string) {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(`${process.env.NEXT_API_URL}/v1/roles/${id}`, {
      method: "PATCH",
      headers: {
        // @ts-ignore
        Authorization: "Bearer " + session.user.accessToken,
      },
      cache: "no-store",
    });
    const data = await response.json();
    if (data.status == "success") {
      return data;
    } else {
      return redirect("/signout");
    }
  }
}
export async function deleteRole(id: string) {
  const session: any = await getServerSession(authOptions);
  if (session) {
    await fetch(`${process.env.NEXT_API_URL}/v1/roles/${id}`, {
      method: "delete",
      headers: {
        // @ts-ignore
        Authorization: "Bearer " + session.user.accessToken,
      },
      cache: "no-store",
    });
  }
}

export async function updateRole(id: string, formdata: any) {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(`${process.env.NEXT_API_URL}/v1/roles/${id}`, {
      method: "PATCH",
      headers: {
        // @ts-ignore
        Authorization: "Bearer " + session.user.accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await response.json();

    return data;
  }
}
