"use client";

import CartItem from '@/components/cart/cart.item';
import CartTotalPrice from '@/components/cart/cart.totalPrice'
import LoadingPage from '@/components/loading/loadingPage';
import { AuthContext } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { sendRequest } from '@/utils/api';
import { Card, Checkbox, Col, Divider, Empty, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const CartPage = () => {
    const { accessToken, user } = useContext(AuthContext) ?? {};
    const [loading, setLoading] = useState<boolean>(false);
    const [carts, setCarts] = useState<ICart[]>([]);
    const { selectedCheckout, setSelectedCheckout } = useCart();

    const getCarts = async () => {
        try {
            setLoading(true);
            const res = await sendRequest<IBackendOdataRes<ICart>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/cart`,
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
                queryParams: {
                    $filter: `UserId eq '${user?.Id}'`
                }
            });
            setCarts(res.value);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!accessToken || !user)
            return;
        getCarts();
    }, [accessToken, user]);

    if (loading)
        return (
            <LoadingPage message='Loading cart...' />
        )

    return (
        <div className='p-5'>
            <Row className='min-h-[50vh]'>
                <Col flex={12} >
                    <p className='uppercase text-3xl font-bold'>Cart items</p>
                    <Divider className='border-[2px] rounded-full' style={{ borderColor: '#9ca3af' }} />
                    {
                        carts.length > 0 ?
                            <>
                                <div className='flex py-2 w-full border my-1 bg-white rounded-lg px-6 shadow-md'>
                                    <Checkbox
                                        onChange={() => {
                                            if (selectedCheckout.length === carts.length) setSelectedCheckout([]);
                                            else setSelectedCheckout(carts);
                                        }}
                                        checked={selectedCheckout.length === carts.length && carts.length > 0}
                                    >Select all</Checkbox>
                                </div>
                                <div className='flex flex-col space-y-2 h-[55vh] overflow-y-scroll'>
                                    {
                                        carts.map((item) => (
                                            <Card key={item.Id} className='border border-gray-400 shadow'>
                                                <div className='flex items-start space-x-4'>
                                                    <Checkbox
                                                        checked={selectedCheckout.some(c => c.Id === item.Id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedCheckout((prev) => [...prev, item]);
                                                            } else {
                                                                setSelectedCheckout((prev) => prev.filter(c => c.Id !== item.Id));
                                                            }
                                                        }} />
                                                    <CartItem cart={item} onReload={getCarts} />
                                                </div>
                                            </Card>
                                        ))
                                    }

                                </div>
                            </>
                            :
                            <div className='flex flex-col items-center justify-center'>
                                <Empty />
                            </div>
                    }
                </Col>
                <Col flex={2}>
                    <CartTotalPrice />
                </Col>
            </Row>
        </div>
    )
}

export default CartPage