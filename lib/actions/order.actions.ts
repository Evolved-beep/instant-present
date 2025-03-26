"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { convertToPlainObject, formatError } from "../utils"
import { auth } from "@/auth"
import { getMyCart } from "./cart.actions"
import { getUserById } from "./user.actions"
import { insertOrderSchema } from "../validator"
import { prisma } from "@/db/prisma"
import { CartItem, ShippingAddress } from "@/types"  

export async function createOrder(){
    try {
        const session = await auth()
        if(!session) throw new Error("Vous devez être connecter")

        const cart = await getMyCart()
        const userId = session?.user?.id
        if(!userId) throw new Error("Utilisateur introuvable")

        const user = await getUserById(userId)
        if(!cart || cart.items.length === 0){
            return {success:false, message:'Votre panier est vide', redirectTo: '/cart'}
        }

        if(!user.address){
            return {success:false, message:'Aucune adresse renseignée', redirectTo: '/shipping-address'}
        }

        if(!user.paymentMethod){
            return {success:false, message:'Veuillez renseigner votre méthode de paiement', redirectTo: '/payment-method'}
        }

        const order = insertOrderSchema.parse({
          userId: user.id,
          shippingAddress: user.address as ShippingAddress,
          paymentMethod: user.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        });

        const insertedOrderId = await prisma.$transaction(async (tx) => {
            // Create order
            const insertedOrder = await tx.order.create({
              data: {
                  userId: order.userId,
                  shippingAddress: order.shippingAddress,
                  paymentMethod: order.paymentMethod,
                  itemsPrice: order.itemsPrice,
                  shippingPrice: order.shippingPrice,
                  totalPrice: order.totalPrice,
              }
          });
            // Create order items from the cart items
            for (const item of cart.items as CartItem[]) {
              await tx.orderItem.create({
                data: {
                  ...item,
                  price: item.price,
                  orderId: insertedOrder.id,
                },
              });
            }
            // Clear cart
            await tx.cart.update({
              where: { id: cart.id },
              data: {
                items: [],
                totalPrice: 0,
                shippingPrice: 0,
                itemsPrice: 0,
              },
            });
      
            return insertedOrder.id;
          });


          if(!insertedOrderId) throw new Error('Order not created')
            return {success:true, message:'Order created', redirectTo:`/order/${insertedOrderId}`}
    } catch (error) {
        if(isRedirectError(error)) throw error
        return {success: false, message:formatError(error)}
    }
}

// Get order by id

export async function getOrderById(orderId:string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId
    },
    include: {
      orderitems: true,
      user: {
        select: {name: true, email:true}
      }
    }
  })
  return convertToPlainObject(data)
}