import React from 'react'
import { Metadata } from 'next'
import { deleteUser, getAllUsers } from '@/lib/actions/user.actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {formatId } from '@/lib/utils'
import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export const metadata:Metadata = {
    title: "Admin Users"
}
const AdminUserPage = async(props: {
    searchParams: Promise<{
        page:string;
        query:string
    }>
}) => {
    const {page = "1", query:searchText} = await props.searchParams;
    const users = await getAllUsers({page:Number(page), query:searchText})
    return (
        <div className='space-y-2'>
        <h2 className='h2-bold'>Utilisateur</h2>
        {searchText && (
          <div>
            Filtrer par <i>&quot;{searchText}&quot;{' '}</i>
            <Link href='/admin/users'>
              <Button variant="outline" size="sm">
                Retirer le filter
              </Button>
            </Link>
          </div>
        )}
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>NOM</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>RÔLE</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{formatId(user.id)}</TableCell>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role}
                  </TableCell>
                  <TableCell>
                    {user.role === "user" ? 
                    (<Badge variant="secondary">Utilisateur</Badge>)
                    :
                    (
                        <Badge variant="default">Admin</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant='outline' size="sm">
                        <Link href={`/admin/users/${user.id}`}>Modifié</Link>
                    </Button>
                    <DeleteDialog id={user.id} action={deleteUser} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {users.totalPages > 1 && (
            <Pagination 
                page={Number(page) || 1}
                totalPages={users?.totalPages} />
          )}
        </div>
      </div>
      )
}

export default AdminUserPage