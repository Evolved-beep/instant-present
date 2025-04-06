import React from 'react'
import { Metadata } from 'next'
import { getMyCart } from '@/lib/actions/cart.actions'
import { getUserById } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { ShippingAddress } from '@/types'
import CheckoutSteps from '@/components/shared/checkout-steps'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'
import PlaceOrderForm from './place-order-form'

export const metadata: Metadata = {
    title: "Commande"
}

const PlaceOrderPage = async() => {
   const cart = await getMyCart()
   const session = await auth()
   const userId = session?.user?.id
   
   if(!userId) throw new Error("Utilisateur introuvable")

    const user = await getUserById(userId)

    if(!cart || cart.items.length === 0) redirect('/cart')
    if(!user.address) redirect('/shipping-address')
    if(!user.paymentMethod) redirect('payment-method')
    const userAddress = user.address as ShippingAddress
  return (
    <>
        <CheckoutSteps current={3} />
        <h1 className="py-4 text-2xl">Commande</h1>
        <div className="grid md:grid-cols-3 md:gap-5">
            <div className='md:col-span-2 overflow-x-auto space-y-4'>
                <Card>
                    <CardContent className='p-4 gap-4'>
                        <h2 className="text-xl pb-4">Adresse de livraison</h2>
                        <p>{userAddress.fullName}</p>
                        <p>{userAddress.streetAdress}, {userAddress.city}{' '}
                            {userAddress.postalCode}, {userAddress.Pays}{' '}
                        </p>
                        <div className='mt-3'>
                            <Link href="/shipping-address">
                            <Button variant="outline">Edit</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='p-4 gap-4'>
                        <h2 className="text-xl pb-4">Méthode de paiement</h2>
                        <p>{user.paymentMethod}</p>
                        <div className='mt-3'>
                            <Link href="/payment-method">
                            <Button variant="outline">Edit</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='p-4 gap-4'>
                        <h2 className="text-xl pb-4">Commande</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Article</TableHead>
                                    <TableHead className='text-center'>Quantité</TableHead>
                                    <TableHead className='text-center'>Prix</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.items.map((item) => (
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
                            <div>{formatCurrency(cart.itemsPrice)}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Frais de port</div>
                            <div>{formatCurrency(cart.shippingPrice)}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Total de votre commande</div>
                            <div>{formatCurrency(cart.totalPrice)}</div>
                        </div>
                        <PlaceOrderForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
  )
}

export default PlaceOrderPage