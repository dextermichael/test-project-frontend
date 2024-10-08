import React from 'react'
import SignIn from '../components/auth/SignIn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getServerSession(authOptions);
  if(session){
    return redirect("/admin");
  }
  return (
    <div>
      <SignIn />
    </div>
  )
}
