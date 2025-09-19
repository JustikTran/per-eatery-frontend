"use client";

import CartSubItem from '@/components/cart/cart.subItem';
import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { LoadingOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Modal, notification, Spin } from 'antd';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

interface IData {
    cart: ICart,
    onReload: () => void
}

const CartItem = ({ cart, onReload }: IData) => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [mainItem, setMainItem] = useState<ICartItem | null>(null);
    const [sideDish, setSideDish] = useState<ICartItem[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [api, contextHolder] = notification.useNotification();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    useEffect(() => {
        const getCartItems = async () => {
            try {
                const res = await sendRequest<IBackendRes<ICartItem[]>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/cart-item/cart-id=${cart.Id}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
                setCartItems(res.Data ?? []);
            } catch (error) {
                console.error(error);
            }
        }


        getCartItems();
    }, [accessToken, cart]);

    useEffect(() => {
        const item = cartItems.find(ci => ci.Dish.Type === 'major');
        if (item) {
            setMainItem(item);
            setSideDish(cartItems.filter(ci => ci.Dish.Id !== item.Dish.Id));
        }
    }, [cartItems]);

    useEffect(() => {
        setQuantity(mainItem?.Quantity ?? 0);
    }, [mainItem])

    const handleUpdateQuantity = async (item: ICartItem) => {
        try {
            const res = await sendRequest<IBackendRes<ICartItem>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/cart-item/id=${item.Id}`,
                method: "PUT",
                headers: { Authorization: `Bearer ${accessToken}` },
                body: item
            })

            if (res.StatusCode == 200 || res.statusCode == 200) {
                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            api.open({
                type: 'error',
                message: 'Update quantity cart failure.',
                showProgress: false,
                duration: 2
            });
            return false;
        }
    }

    const handleChangeQuantity = async (value: number, item: ICartItem) => {
        const newQuantity = quantity + value;

        if (newQuantity == 0) {
            setQuantity(0);
            setShowModal(true);
            return;
        }

        const cartItem: ICartItem = {
            ...item,
            Quantity: newQuantity
        }
        const success = await handleUpdateQuantity(cartItem);

        if (success)
            setQuantity(newQuantity);
    }

    const handleDelete = async (id: string) => {
        try {
            setConfirmLoading(true);
            const res = await sendRequest<IBackendRes<object>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/cart/id=${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            if (res.statusCode == 200 || res.StatusCode == 200) {
                onReload();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setConfirmLoading(false);
        }
    }

    return (
        <div className='flex space-x-2 w-full'>
            {contextHolder}
            <Image className='rounded-lg' alt={mainItem?.Dish.Name} src={mainItem?.Dish?.Image} width={150} height={150} />
            <div className='flex justify-between w-full'>
                <div>
                    <div>
                        <Link href={''} className='text-black hover:text-black hover:underline font-bold text-lg'>{mainItem?.Dish.Name}</Link>
                        <p className='font-bold'>Price: <span className='font-normal'>{mainItem?.Dish?.Price.toLocaleString()} VND</span></p>
                        {
                            sideDish.map((item) => (
                                <CartSubItem
                                    key={item.Id}
                                    item={item}
                                    onReload={onReload} />
                            ))
                        }
                    </div>
                    <p className='font-bold'>Total: <span className='text-red-800 text-xl'>{cart.Total!.toLocaleString()} VND</span></p>
                </div>

                <div className='w-44 h-fit flex justify-between'>
                    <p className='mr-1'>Quantity:</p>
                    <button
                        onClick={() => handleChangeQuantity(-1, mainItem!)}
                        className='px-1 border border-gray-300 hover:bg-gray-200 duration-200 rounded'><MinusOutlined /></button>
                    <p>{quantity}</p>
                    <button
                        onClick={() => handleChangeQuantity(1, mainItem!)}
                        className='px-1 border border-gray-300 hover:bg-gray-200 duration-200 rounded'><PlusOutlined /></button>
                </div>
            </div>

            <Modal
                title="Confirm delete"
                visible={showModal}
                closeIcon={false}
                centered
                footer
            >
                <div className='space-y-2'>
                    <p>Are you sure delete this item?</p>
                    <div className='flex justify-end space-x-4'>
                        <button
                            onClick={() => {
                                setShowModal(false)
                                setQuantity(mainItem!.Quantity);
                            }}
                            className='border rounded-lg p-2 px-4 text-black hover:text-black hover:border-blue-600'>
                            Cancel
                        </button>
                        <button
                            onClick={() => handleDelete(cart.Id)}
                            className='flex items-center space-x-1 border rounded-lg p-2 px-4 bg-blue-600 text-white hover:text-white hover:border-white'>
                            <Spin spinning={confirmLoading} indicator={<LoadingOutlined style={{ color: 'white' }} spin />}>
                            </Spin>
                            <span>Ok</span>
                        </button>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default CartItem