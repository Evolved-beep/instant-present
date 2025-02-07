import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Sign In',
}

const SignInPage = async(props: {
    searchParams: Promise<{
        callbackUrl:string
    }>
}) => {
    const {callbackUrl} = await props.searchParams
    const session = await auth();

    if(session){
        return redirect(callbackUrl || '/')
    }
    return <div className="w-full max-w-md mx-auto">
        <Card>
            <CardHeader className="space-y-4">
                <Link href='/' className="flex-center">
                    <Image src='/images/logo.png' height={100} width={100} alt={`${APP_NAME} logo`} className="flex-center"/>
                </Link>
                <CardTitle className="text-center">Connexion</CardTitle>
                <CardDescription className="text-center">
                    Connectez-vous à votre compte
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <CredentialsSignForm />
            </CardContent>
        </Card>
    </div>
}

export default SignInPage