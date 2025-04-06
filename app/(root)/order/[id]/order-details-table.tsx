import React from 'react'
import { Order } from '@/types'
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import Link from 'next/link'



const OrderDetailsTable = ({order} : {order: Omit<Order,'paymentResult'>}) => {
    const {
        id,
        shippingAddress,
        orderitems,
        itemsPrice,
        shippingPrice, 
        totalPrice,
        paymentMethod,
        isDelivered,
        isPaid,
        paidAt,
        deliveredAt
    } = order
  return (
    <>
        <h1 className='py-4 text-2xl'>Récapitulatif de votre commande {formatId(id)}</h1>
        <div className='grid md:grid-cols-3 md:gap-5'>
            <div className='col-span-2 space-4-y overlow-x-auto'>

                <Card>
                    <CardContent className='p-4 gap-4'>
                        <h2 className='text-xl pb-4'>Méthode de paiment</h2>
                        <p className='mb-2'>{paymentMethod}</p>
                        {isPaid ? (
                            <Badge variant="secondary">
                                Payé le {formatDateTime(paidAt!).dateTime}
                            </Badge>
                        ):(
                            <Badge variant="destructive">
                                Non payé
                            </Badge>
                        )}
                    </CardContent>
                </Card>
                <Card className='my-2'>
                    <CardContent className='p-4 gap-4'>
                        <h2 className='text-xl pb-4'>Adresse de livraison</h2>
                        <p>{shippingAddress.fullName}</p>
                        <p className='mb-2'>{shippingAddress.streetAdress}, {shippingAddress.city}
                            {shippingAddress.postalCode}, {shippingAddress.Pays}
                        </p>
                        {isDelivered ? (
                            <Badge variant="secondary">
                                Livré le {formatDateTime(paidAt!).dateTime}
                            </Badge>
                        ):(
                            <Badge variant="destructive">
                                Non Livré
                            </Badge>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='p-4 gap-4'>
                        <h2 className='text-xl pb-4'>Contenu de votre commande</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Article</TableHead>
                                    <TableHead className='text-center'>Quantité</TableHead>
                                    <TableHead className='text-center'>Prix</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderitems.map((item) => (
                                    <TableRow key={item.slug}>
                                        <TableCell>
                                            <Link href={`/product/${item.slug}`} className='flex items-center'>
                                            <Image 
                                                src={item.image} 
                                                alt={item.name}
                                                height={50}
                                                width={50} />
                                                <span className='px-2'>{item.name}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            <span>{item.qty}</span>
                                        </TableCell>
                                        <TableCell className='text-center'>{item.price}€</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardContent className='p-4 gap-4 space-y-4'>
                        <div className='flex justify-between'>
                            <div>Article</div>
                            <div>{formatCurrency(itemsPrice)}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Frais de port</div>
                            <div>{formatCurrency(shippingPrice)}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Total de votre commande</div>
                            <div>{formatCurrency(totalPrice)}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
  )
}

export default OrderDetailsTable