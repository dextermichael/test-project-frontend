import AccountForm from '@/components/dashboard/AccountForm';
import { getLoggedInUser } from '@/lib/server-function/user'
import React from 'react'

export default async function page() {
    const user : any = await getLoggedInUser();
  return (
    <div>
        <AccountForm user={user.data.user} />
    </div>
  )
}
