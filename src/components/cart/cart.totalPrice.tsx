"use client";

import { useCart } from '@/contexts/CartContext';
import { Card, Col, Divider, Row } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CartTotalPrice = () => {
    const { selectedCheckout } = useCart();
    const [total, setTotal] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const totalPrice = selectedCheckout.reduce((sum, item) => {
            return sum + item.Total!;
        }, 0);
        setTotal(totalPrice);
    }, [selectedCheckout]);

    return (
        <div className='px-2 h-full'>
            <Card className='h-fit shadow-lg '>
                <div className='min-h-[50vh] flex flex-col justify-between'>
                    <div>
                        <p className='font-black text-lg'>Discount Detail</p>
                        <Divider style={{ borderColor: '#9ca3af' }} />
                        <Row>
                            <Col span={12}><p>Subtotal ({selectedCheckout.length} item):</p></Col>
                            <Col span={12}><p className='text-right'>{total.toLocaleString()}</p></Col>
                            <Col span={12}><p>Discount:</p></Col>
                            <Col span={12}><p className='text-right'>0</p></Col>
                        </Row>
                    </div>

                    <div>
                        <Divider style={{ borderColor: '#9ca3af' }} />
                        <Row>
                            <Col span={12}><p className='font-bold text-lg'>Total price ({selectedCheckout.length} item):</p></Col>
                            <Col span={12}><p className='font-bold text-xl text-right'>{total.toLocaleString()} VND</p></Col>
                        </Row>
                        <button
                            onClick={() => {
                                router.push('/check-out')
                            }}
                            className='mt-4 py-2 border w-full rounded-full border-gray-400 hover:bg-gray-300 font-bold duration-200 ease-out'>Process to checkout</button>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default CartTotalPrice