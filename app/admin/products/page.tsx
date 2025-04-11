import DeleteDialog from '@/components/shared/delete-dialog';
import Pagination from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllProducts, deleteProduct } from '@/lib/actions/product.actions';
import { formatCurrency, formatId } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'


const AdminProductsPage = async(props: {
    searchParams: Promise<{
        page:string,
        query:string, 
        category:string;
    }>
}) => {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const searchText = searchParams.query || "";
    const category = searchParams.category || "";

    const products = await getAllProducts({
        query:searchText,
        page,
        category
    })
  return (
    <div className='space-y-2'>
        <div className='flex-between'>
            <div className='flex items-center gap-3'>
                <h1 className='h2-bold'>Produits</h1>
                {searchText && (
                    <div>
                        Filtrer par <i>&quot;{searchText}&quot;</i>{' '}
                        <Link href='/admin/products'>
                            <Button variant="outline" size="sm">Remove Filter</Button>
                        </Link>
                    </div>
                )}
            </div>
            <Button asChild variant='default'>
                <Link href='/admin/products/create'>Créer un produit</Link>
            </Button>
        </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead className='text-right'>Prix</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead className='w-[100px]'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.data.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{formatId(product.id)}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className='text-right'>{formatCurrency(product.price)}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.rating}</TableCell>
                            <TableCell className='flex gap-1'>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/admin/products/${product.id}`}>Modifier</Link>
                                </Button>
                                <DeleteDialog id={product.id} action={deleteProduct}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {products?.totalPages && products.totalPages > 1 && (
                <Pagination page={page} totalPages={products.totalPages} />
            )}
    </div>
  )
}

export default AdminProductsPage