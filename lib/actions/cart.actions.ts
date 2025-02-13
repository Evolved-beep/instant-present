'use server'

import { CartItem } from "@/types"
import { cookies } from "next/headers"
import { convertToPlainObject, formatError, round2 } from "../utils"
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validator";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

const calcPrice = (items: CartItem[]) => {
    const itemsPrice = round2(
        items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    totalPrice = round2(itemsPrice + shippingPrice);

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        totalPrice : totalPrice.toFixed(2)
    }
}

export async function addItemToCart(data: CartItem) {
    try {
        const sessionCartId = ((await cookies())).get('sessionCartId')?.value;
        if(!sessionCartId) throw new Error('Cart session not found')

            const session = await auth()
            const userId = session?.user?.id ? (session.user.id as string) : undefined

            const cart = await getMyCart()
            const item = cartItemSchema.parse(data)
            const product = await prisma.product.findFirst({
                where: {id: item.productId} 
            })
            if(!product) throw new Error("Aucun produit trouvé")
            if(!cart) {
                const newCart = insertCartSchema.parse({
                    userId: userId,
                    items: [item],
                    sessionCartId: sessionCartId,
                    ...calcPrice([item])
                })
                
                await prisma.cart.create({
                    data:newCart
                })

                revalidatePath(`/product/${product.slug}`)

                return {
                    success:true,
                    message:`${product.name} ajouté au panier`
                }
            } else {
                const existItem = (cart.items as CartItem[]).find((x) => x.productId === item.productId)
                if(existItem){
                    if(product.stock < existItem.qty + 1){
                        throw new Error("Pas assez de stock dispo")
                    }
                    (cart.items as CartItem[]).find((x) => x.productId === item.productId)!.qty = existItem.qty + 1;
                } else {
                    if(product.stock < 1) throw new Error("Le nombre voulu n'est pas disponible")
                        cart.items.push(item)
                }
                await prisma.cart.update({
                    where: {id:cart.id},
                    data: {
                        items: cart.items as Prisma.CartUpdateitemsInput[],
                        ...calcPrice(cart.items as CartItem[]) 
                    }
                })
                revalidatePath(`/product/${product.slug}`);
                return {
                    success: true,
                    message:`${product.name} ${existItem ? 'quantité' : 'article ajouté'} au panier`
                }
            }
    } catch(error) {
        return{
            success: false, 
            message:formatError(error)
        }
    }
}

export async function getMyCart(){
    const sessionCartId = (await cookies()).get('sessionCartId')?.value; 
    if(!sessionCartId) throw new Error('Cart session not found');

    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await prisma.cart.findFirst({
        where: userId ? {userId: userId} : {sessionCartId : sessionCartId}
    })

    if(!cart) return undefined; 

    return convertToPlainObject({
        ...cart, 
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString()
    })
}

export async function removeItemFromCart(productId: string){
    try {
        const sessionCartId = (await cookies()).get('sessionCartId')?.value
        if(!sessionCartId) throw new Error('Cart session not found');

        const product = await prisma.product.findFirst({
            where: {id:productId }
        })
        if(!product) throw new Error('Product not found')
        
        const cart = await getMyCart()
        if(!cart) throw new Error('Cart not found')

        const exist = (cart.items as CartItem[]).find((x) => x.productId === productId)
        if(!exist) throw new Error('Item not found');

        if(exist.qty === 1){
            cart.items = (cart.items as CartItem[]).filter((x) => x.productId !== exist.productId)
        } else {
            (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty = exist.qty - 1
        }

        await prisma.cart.update({
            where: {id: cart.id},
            data: {
                items: cart.items as Prisma.CartUpdateitemsInput[],
                ...calcPrice(cart.items as CartItem[]),
            }
        })

        revalidatePath(`/product/${product.slug}`);
        return {
            success: true,
            message: `${product.name} à été retiré du panier`
        }
    } catch (error) {
        return { success: false, message: formatError(error)}
    }
}