import {z} from 'zod'
import { formatNumberWithDecimal } from './utils'
import { PAYMENT_METHOD } from './constants'

const currency = z
                .string()
                .refine(
                    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
                    "Le prix doit contenir deux chiffres après la virgule"
                )

export const insertProductSchema = z.object({
    name: z.string().min(3,"Le nom doit comporter au minimum 3 caractères"),
    slug: z.string().min(3, "Le slug doit comporter au minimum 3 caractères"),
    category: z.string().min(3,'Category doit comporter au minimum 3 caractères'),
    brand: z.string().min(3, "La marque doit comporter au minimum 3 caractères"),
    description: z.string().min(3,"Votre description doit comporter au minimum 3 caractères"),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, 'Vous devez ajouter une image à votre produit'),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
})

export const updateProductSchema = insertProductSchema.extend({
    id: z.string().min(1, "L'ID est requis")
})

export const signInFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

export const signUpFormSchema = z.object({
    name: z.string().min(3,"Votre nom doit contenir au minimum 3 caractères"),
    email: z.string().email('Invalid email adress'),
    password: z.string().min(6, 'Votre mot de passe doit contenir au minimum 6 caractères'),
    confirmPassword: z.string().min(6, "Veuillez entrer le même mot de passe")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passes ne sont pas identiques",
    path:['confirmPassword']
})

export const cartItemSchema = z.object({
    productId: z.string().min(1, "Un produit doit être ajouter"),
    name: z.string().min(1, "Un nom doit être ajouter"),
    slug: z.string().min(1, "Test"),
    qty: z.number().int().nonnegative("La quantité ne peut pas être négative"),
    image: z.string().min(1, "Une image doit être ajouter"),
    price: currency
})

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    sessionCartId: z.string().min(1,"Session Cart Id is required"),
    userId: z.string().optional().nullable()

})

export const shippingAddressSchema = z.object({
    fullName: z.string().min(3, "Votre nom doit comporter au minimum 3 caractères"),
    streetAdress: z.string().min(3, "Votre adresse doit comporter au minimum 3 caractères"),
    city: z.string().min(3, "Votre ville doit comporter au minimum 3 caractères"),
    postalCode: z.string().min(3, "Votre code postal doit comporter au minimum 3 caractères"),
    Pays: z.string().min(3, "Votre pays doit comporter au minimum 3 caractères"),
    lat: z.number().optional(),
    lng: z.number().optional(),
})

export const paymentMethodSchema = z.object({
    type: z.string().min(1,'Payment method is required')
}).refine((data) => PAYMENT_METHOD.includes(data.type), {
    path:['type'],
    message:'Invalid payment method'
})

export const insertOrderSchema = z.object({
    userId: z.string().min(1,'Un compte est requis'),
    itemsPrice: currency,
    shippingPrice: currency,
    totalPrice: currency,
    paymentMethod: z.string().refine((data) => PAYMENT_METHOD.includes(data),{
        message:'Methode de paiement invalide'
    }),
    shippingAddress: shippingAddressSchema
});

export const insertOrderItemSchema = z.object({
    productId: z.string(),
    slug: z.string(),
    image: z.string(),
    name:z.string(),
    price: currency,
    qty: z.string(),
})

export const updateProfileSchema = z.object({
    name: z.string().min(3, "Votre nom doit contenir au minimum 3 caractères"),
    email: z.string().min(3, "Votre email doit contenir au minimum 3 caractères")
})

export const updateUserSchema = updateProfileSchema.extend({
    id:z.string().min(1, "L'ID est requis"),
    role:z.string().min(1, "Le rôle est requis ")
})