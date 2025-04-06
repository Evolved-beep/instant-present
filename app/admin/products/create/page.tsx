import React from 'react'
import { Metadata } from 'next'
import ProductForm from '@/components/admin/product-form';

export const metadata: Metadata = {
    title:"Création d'un produit",
};

const CreateProductPage = async() => {
  return (
    <div>
        <h2 className='h2-bold'>Créer un produit</h2>
        <div className='my-8'>
            <ProductForm type='Create' />
        </div>
    </div>
  )
}

export default CreateProductPage