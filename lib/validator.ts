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