/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import Link from 'next/link'
import { StoreContext } from '../utils/StoreContext/StoreContext'
import { useRouter } from 'next/router';

function ProductItem({ product }) {
    //Context
    const { dispatch, state } = useContext(StoreContext);

    // For redirection
    const router = useRouter();

     // functions to add to cart and update qty
     const addToCartHandler = () => {
        const existingProduct = state.cart.cartItems.find((item)=> item.slug === product.slug);
        const quantity = existingProduct ? parseInt(existingProduct.quantity) + 1 : 1; // need to declare this becoz if product does not existing, there is no qty variable to increment
        if(quantity > product.countInStock) {
            alert('Sorry, product is out of stock!');
            return;
        }
        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: quantity } })
        router.push('/cart');
    }

  return (
    <div className="card">

      {/* PRODUCT IMAGE */}
      <Link href={`/product/${ product.slug }`}>
        <a>
            <img src={ product.image } alt={ product.name } className="rounded shadow"/>
        </a>
      </Link>

      {/* DESCRIPTIONS - flex-col */}
      <div className="flex flex-col items-center justify-center p-5">
        {/* a. ProductName */}
        <Link href={`/product/${ product.slug }`}>
            <a>
                <h2 className="text-lg">{ product.name }</h2>
            </a>
        </Link>

        {/* b. Productbrand*/}
        <p className="mb-2">{ product.brand }</p>
        {/* Productprice */}
        <p>${ product.price }</p>

        {/* c. Add to Cart Btn */}
        <button className="primary-button" type="button" onClick={ addToCartHandler }>
            Add to cart
        </button>
      </div>

    </div>
  )
}

export default ProductItem
