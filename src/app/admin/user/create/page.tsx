import UserForm from '@/components/dashboard/UserForm'
import { getUserRoleList } from '@/lib/server-function/user'
import React from 'react'

export default async function page() {
    const roles = await getUserRoleList();
  return (
    <div>
        <UserForm roles={roles.data.roles}/>
    </div>
  )
}
