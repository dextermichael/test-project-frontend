import RoleForm from '@/components/dashboard/RoleForm';
import UserForm from '@/components/dashboard/UserForm'
import { getRoleById } from '@/lib/server-function/role';
import React from 'react'

export default async function page({ params: {id} }: { params: { id: string;} }) {

    const role = await getRoleById(id)
  return (
    <div>
        <RoleForm  id={id} role={role.data}/>
    </div>
  )
}
