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

        {/* RETURN to HOME */}
        <div className="py-2">
            <Link href="/">back to products</Link>
        </div>

        {/* PRODUCT INFO - 3 columns */}
        <div className="grid md:grid-cols-4 md:gap-3">
            {/* Note: 2 columns of 4 columns - col-span-2 */}
            {/* a. image (col - 1)*/}
            <div className="md:col-span-2">
                <Image
                    src={ product.image }
                    alt={ product.name }
                    width={ 640 }
                    height={ 640 }
                    layout="responsive"
                />
            </div>
            {/* b. product desc (col -2) */}
            <div>
                <ul>
                    <li>
                        <h1 className="text-lg">{ product.name }</h1>
                    </li>
                    <li>Category: { product.category }</li>
                    <li>Brand: { product.brand }</li>
                    <li>{ product.rating } of { product.numReviews } reviews</li>
                    <li>Description: { product.description }</li>
                </ul>
            </div>
            {/* c. product price (col - 3) */}
            <div>
                <div className="card p-5">
                    {/* i. price */}
                    <div className="mb-2 flex justify-between">
                        <div>Price</div>
                        <div>${ product.price }</div>
                    </div>
                    {/* ii. status */}
                    <div className="mb-2 flex justify-between">
                        <div>Status</div>
                        <div>{ product.countInStock > 0 ? 'In stock' : 'Unavailable' }</div>
                    </div>
                    {/* iii. add to cart */}
                    <button className="primary-button w-full">Add to cart</button>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ProductScreen
