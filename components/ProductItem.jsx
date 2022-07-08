/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

function ProductItem({ product }) {
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
        <button className="primary-button" type="button">
            Add to cart
        </button>
      </div>

    </div>
  )
}

export default ProductItem
