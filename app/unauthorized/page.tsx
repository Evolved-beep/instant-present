import React from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
    title:"Accés refusé"
}


const Unauthorized = () => {
  return (
    <div className='container mx-auto flex flex-col items-center justify-center space-y-4 h-[calc(100vh-200px)]'>
        <h1 className='h1-bold text-4xl'>Accés refusé</h1>
        <p className='text-muted-foreground'>Vous n'avez pas la permission d'accéder à cette page</p>
        <Button asChild>
            <Link href="/">Retour à la page d'accueil</Link>
        </Button>
    </div>
  )
}

export default Unauthorized