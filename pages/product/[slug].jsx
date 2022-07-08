import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout'
import { useRouter } from 'next/router';
import data from '../../utils/data';

function ProductScreen() {
    const { query } = useRouter(); // get url
    const { slug } = query; // get slug item from url
    const product = data.products.find((product)=> product.slug === slug); // use slug to seach for individual product
    if(!product) return <div>Product Not Found</div>

    return (
    <Layout title={ product.name }>
        <div className="py-2">
            <Link href="/">back to products</Link>
        </div>

        <div className="grid md:grid-cols-4 md:grid-gap-3">
            {/* 2 columns of 4 columns */}
            <div className="md:col-span-2">
                <Image
                    src={ product.image }
                    alt={ product.name }
                    width={ 640 }
                    height={ 640 }
                    layout="responsive"
                />
                
            </div>
        </div>
    </Layout>
  )
}

export default ProductScreen
