"use client";

import { useCart } from '@/contexts/CartContext';
import React from 'react'

const CheckOutPage = () => {
    const { selectedCheckout } = useCart();
    console.log(selectedCheckout);

    return (
        <div className='p-5'>CheckOutPage</div>
    )
}

export default CheckOutPage