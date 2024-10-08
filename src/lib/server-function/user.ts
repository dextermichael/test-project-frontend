"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import { redirect } from "next/navigation";

export async function getLoggedInUser() {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/v1/settings/update-settings`,
      {
        method: "PATCH",
        headers: {
          // @ts-ignore
          Authorization: "Bearer " + session.user.accessToken,
        },
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (data.status == "success") {
      return data;
    } else {
      return redirect("/signout");
    }
  }
}
export async function updateUserSettings(formdata: any) {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/v1/settings/update-settings`,
      {
        method: "PATCH",
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

export async function getUserList() {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(`${process.env.NEXT_API_URL}/v1/users`, {
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
export async function getUserRoleList() {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/v1/users/role-list`,
      {
        headers: {
          // @ts-ignore
          Authorization: "Bearer " + session.user.accessToken,
        },
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (data.status == "success") {
      return data;
    } else {
      return redirect("/signout");
    }
  }
}
export async function createUser(formdata: any) {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/v1/users/create-user`,
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

export async function getUserById(id: string) {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(`${process.env.NEXT_API_URL}/v1/users/${id}`, {
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
export async function deleteUser(id: string) {
  const session: any = await getServerSession(authOptions);
  if (session) {
    await fetch(`${process.env.NEXT_API_URL}/v1/users/${id}`, {
      method: "delete",
      headers: {
        // @ts-ignore
        Authorization: "Bearer " + session.user.accessToken,
      },
      cache: "no-store",
    });
  }
}

export async function updateUser(id: string, formdata: any) {
  const session: any = await getServerSession(authOptions);
  if (session) {
    const response = await fetch(`${process.env.NEXT_API_URL}/v1/users/${id}`, {
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
