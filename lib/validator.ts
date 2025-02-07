import {z} from 'zod'
import { formatNumberWithDecimal } from './utils'

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
    images: z.array(z.string().min(1, "Vous devez au moins ajouter une image pour le produit concerné")),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
})

export const cartItemSchema = z.object({
    productId: z.string().min(1,'Le produit est requis'),
    name: z.string().min(1,'Le nom est requis'),
    slug: z.string().min(1,'Slug est requis'),
    qty: z.number().int().nonnegative('La quantité doit être positive'),
    image: z.string().min(1,'Une photo est requise'),
    price:currency,
})

export const signInFormSchema = z.object({
    email: z.string().email('Invalid email adress'),
    password: z.string().min(6, 'Votre mot de passe doit contenir au minimum 6 caractères')
})

export const signUpFormSchema = z.object({
    name: z.string().min(3,"Votre nom doit contenir au minimum 3 caractères"),
    email: z.string().email('Invalid email adress'),
    password: z.string().min(6, 'Votre mot de passe doit contenir au minimum 6 caractères'),
    confirmPassword: z.string().min(6, "Veuillez entrer le même mot de passe")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passes ne sont pas identiques",
    path:['confirmPassword']
})