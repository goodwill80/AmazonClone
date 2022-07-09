import React, { useContext } from 'react'
import { XCircleIcon } from '@heroicons/react/outline';
import { StoreContext } from '../utils/StoreContext/StoreContext';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter} from 'next/router';

function CartScreen() {

    // Context for rendering of cart items on page
    const { state, dispatch } = useContext(StoreContext);
    const { cart: { cartItems } } = state;

    // For redirection
    const router = useRouter();

    // Function to remove item
    const removeItemHandler = (item) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    }

  return (
    <Layout title="Shopping Cart">
        <h1 className="mb-4 text-xl">Shopping Cart</h1>
        {   
            cartItems.length === 0 ? // if length is zero
            <div>
                Cart is empty. <Link href="/">Go Shopping</Link> 
            </div> 
            :
            <div className="grid md:grid-cols-4 md:gp-5">
                <div className="overflow-x-auto md:col-span-3">
                    {/* Cart Table */}
                    <table className="min-w-full">
                    {/* Header Row */}
                    <thead className="border-b">
                        <tr>
                            <th className="px-5 text-left">Item</th>
                            <th className="p-5 text-right">Quantity</th>
                            <th className="p-5 text-right">Price</th>
                            <th className="p-5">Action</th>
                        </tr>
                    </thead>
                    {/* Main Body of Table */}
                    <tbody>
                        { cartItems.map((item, index)=> 
                            <tr key={ index } className="border-b">
                                {/* a. Image and Name */}
                                <td>
                                    <Link href={ `/product/${item.slug}` }>
                                        <a className="flex items-center">
                                            <Image
                                                src={ item.image }
                                                alt={ item.name }
                                                width={50}
                                                height={50}
                                            ></Image>
                                            &nbsp;
                                            { item.name }
                                        </a>
                                    </Link>
                                </td>
                                {/* b. Quantity */}
                                <td className="p-5 text-right">{ item.quantity }</td>
                                {/* c. Price */}
                                <td className="p-5 text-right">{ item.price }</td>
                                {/* d. Action icon */}
                                <td className="p-5 text-center">
                                    <button onClick={()=> removeItemHandler(item)}>
                                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                {/* Sub-total */}
                <div className="card p-5">
                    <ul>
                        <li>
                            <div className="pb-3 text-xl">
                                Subtotal ({ cartItems.reduce((a,b)=> a + b.quantity, 0)})
                                : $
                                { cartItems.reduce((a,b)=> a + b.quantity * b.price, 0)}
                            </div>
                        </li>
                        <li>
                            <button className="primary-button w-full"
                                    onClick={()=> router.push("/shipping")}>
                                Check Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        }
    </Layout>
  )
}

export default CartScreen;
