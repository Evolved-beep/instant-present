export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Instant-Présent"
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Test'
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ||'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4

console.log("SERVER_URL",SERVER_URL)
export const signInDefaultValues = {
    email: '',
    password:''
} 

export const signUpDefaultValues = {
    name:'',
    email: '',
    password:'',
    confirmPassword:''
} 

export const shippingAddressDefaultValues = {
    fullName: '',
    streetAdress: "",
    city:"",
    postalCode:"",
    Pays:''
}

export const PAYMENT_METHOD = process.env.PAYMENT_METHOD ? process.env.PAYMENT_METHOD.split(', ') : ["Paypal", "Stripe"]
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'Stripe'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12
export const productDefaultValues = {
    name: "",
    slug: "",
    category: "",
    images: [],
    brand: "",
    description: "",
    price: "0",
    stock: 0,
    rating: "0",
    numReviews: "0",
    isFeatured: false,
    banner: "null",

}

export const USER_ROLES = process.env.USER_ROLES ? process.env.USER_ROLES.split(', ') : ["admin", "user"];