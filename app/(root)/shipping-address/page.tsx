import { auth } from '@/auth'
import { getMyCart } from '@/lib/actions/cart.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import { ShippingAdress } from '@/types'
import { getUserById } from '@/lib/actions/user.actions'
import { Metadata } from 'next'
import ShippingAdressForm from './shipping-adress-form'
import CheckoutSteps from '@/components/shared/checkout-steps'

export const metadata: Metadata = {
  title:'Shipping adresss'
}

const ShippingAddressPage = async() => {
  const cart = await getMyCart();

  if(!cart || cart.items.length === 0) redirect('/cart')
    const session = await auth()
  const userId = session?.user?.id
  if(!userId) throw new Error("User Not found")
    const user = await getUserById(userId);
  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAdressForm address={user.address as ShippingAdress}/>
    </>
  )
}

export default ShippingAddressPage