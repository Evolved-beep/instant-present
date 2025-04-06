"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React from 'react'

const Links = [{
    title:'Overview',
    href:'/admin/overview'
},
{
    title:'Produits',
    href:'/admin/products'
},
{
    title:'Commandes',
    href:'/admin/orders'
},
{
    title:'Utilisateur',
    href:'/admin/users'
},]

const MainNav = ({className, ...props}: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname()
  return (
    <nav 
        className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
            {Links.map((item) => (
                <Link key={item.href} href={item.href} className={cn('text-sm font-medium transition-colors hover:text-primary', pathname.includes(item.href) ? '' : 'text-muted-foreground' )}>
                    {item.title}
                </Link>
            ))}
    </nav>
  )
}

export default MainNav