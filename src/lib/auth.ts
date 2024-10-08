import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 4 hours
  },
  pages: {
    signIn: "/",
    error : "/"
  },
  providers: [
    AzureADProvider({
      clientId: `${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET}`,
      tenantId: `${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
      async profile(profile): Promise<any> {
        //mkae first naem and last name from the name
        const name = profile.name.split(" ");
        const first_name = name[0];
        const last_name = name[1];
        const res = await fetch(
          `${process.env.NEXT_API_URL}/v1/auth/login-oauth`,
          {
            method: "POST",
            body: JSON.stringify({
              email: profile.email,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
      
        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            randomKey: user.token,
          };
        }
        return {
          id: 1,
          name: "Test",
          email: "Null",
          randomKey: "",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile): Promise<any> {
        const res = await fetch(
          `${process.env.NEXT_API_URL}/v1/auth/login-oauth`,
          {
            method: "POST",
            body: JSON.stringify({
              email: profile.email,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
       
        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            randomKey: user.token,
          };
        }
        return {
          id: 1,
          name: "Test",
          email: "Null",
          randomKey: "",
        };
      },
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_API_URL}/v1/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          cache: "no-cache",
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            randomKey: user.token,
          };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile } : any) {
      if (account.provider === "google") {
       
          const res = await fetch(
            `${process.env.NEXT_API_URL}/v1/auth/login-oauth`,
            {
              method: "POST",
              body: JSON.stringify({
                email: profile.email,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const user = await res.json();
          
          // If no error and we have user data, return it
          if (res.ok && user) {
            return true;
          }
          return false;
        
      }
      if (account.provider === "azzure-ad") {
       
          const res = await fetch(
            `${process.env.NEXT_API_URL}/v1/auth/login-oauth`,
            {
              method: "POST",
              body: JSON.stringify({
                email: profile.email,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const user = await res.json();
          
          // If no error and we have user data, return it
          if (res.ok && user) {
            return true;
          }
          return false;
        
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.randomKey,
        },
      };
    },
   
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }

      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
        token.email = session.email;
      }

      return token;
    },
  },
};
