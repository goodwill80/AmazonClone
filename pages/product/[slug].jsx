import React, { useContext } from 'react'
import { StoreContext } from '../../utils/StoreContext/StoreContext';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout'
import { useRouter } from 'next/router';
import data from '../../utils/data';

// [slug].js
function ProductScreen() {

    // Route params to render single product view
    const { query } = useRouter(); // get url
    const { slug } = query; // get slug item from url
    const product = data.products.find((product)=> product.slug === slug); // use slug to seach for individual product
    
    // function to re-route to another page - please see addToCartHandler
    const router = useRouter();

    // Context for add to cart
    const { dispatch, state } = useContext(StoreContext);
    
    // functions to add to cart and update qty
    const addToCartHandler = () => {
        const existingProduct = state.cart.cartItems.find((item)=> item.slug === slug);
        const quantity = existingProduct ? parseInt(existingProduct.quantity) + 1 : 1; // need to declare this becoz if product does not existing, there is no qty variable to increment
        if(quantity > product.countInStock) {
            alert('Sorry, product is out of stock!');
            return;
        }
        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: quantity } })
        router.push('/cart'); // redirect user to the cart page
    }
    
    // Rendering
    if(!product) return <div>Product Not Found</div>

    return (
    <Layout title={ product.name }>

        {/* RETURN to HOME */}
        <div className="py-2">
            <Link href="/">back to products</Link>
        </div>

        {/* PRODUCT INFO - 3 columns merged from 4 cols */}
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
                    <button className="primary-button w-full" onClick={ addToCartHandler }>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ProductScreen
