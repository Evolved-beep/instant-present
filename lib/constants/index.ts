export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Instant-Présent"
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Test'
export const SERVEUR_URL = process.env.NEXT_PUBLIC_SERVEUR_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4

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