import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUserById } from '@/lib/actions/user.actions'
import UpdateUserForm from './update-user-form'

export const metadata:Metadata = {
    title:"Modification de l'utilisateur"
}

const AdminUpdateUserPage = async(props:{
    params:Promise<{
        id: string
    }>
}) => {
    const {id} = await props.params
    const user = await getUserById(id)
    if(!user) notFound()
    console.log(user)
  return (
    <div className='space-y-8 max-w-lg mx-auto'>
        <h1 className='h2-bold'>Modification de l'utilisateur</h1>
        <UpdateUserForm user={user}/>
    </div>
  )
}

export default AdminUpdateUserPage