import React from 'react'
import { Order } from '@/types'
import { formatDateTime, formatId } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


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
                        <p>{paymentMethod}</p>
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
                        <p>{shippingAddress.streetAdress}, {shippingAddress.city}
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
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
  )
}

export default OrderDetailsTable