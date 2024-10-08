import UserForm from '@/components/dashboard/UserForm'
import { getUserById, getUserRoleList } from '@/lib/server-function/user'
import React from 'react'

export default async function page({ params: {id} }: { params: { id: string;} }) {
    const roles = await getUserRoleList();
    const user = await getUserById(id)
  return (
    <div>
        <UserForm roles={roles.data.roles} id={id} user={user.data}/>
    </div>
  )
}
