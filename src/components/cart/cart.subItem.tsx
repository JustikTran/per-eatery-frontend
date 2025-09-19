"use client";

import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { LoadingOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Image, Modal, notification, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

interface IData {
    item?: ICartItem,
    onReload: () => void
}

const CartSubItem = ({ item, onReload }: IData) => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const [quantity, setQuantity] = useState<number>(1);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    

    useEffect(() => {
        setQuantity(item?.Quantity ?? 0);
    }, [item])

    const handleDelete = async (id: string) => {
        try {
            setConfirmLoading(true);
            const res = await sendRequest<IBackendRes<object>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/cart-item/id=${id}`,
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

    return (
        <div className='border p-2 rounded-lg'>
            {contextHolder}
            <div className='flex space-x-4'>
                <div className='flex space-x-2'>
                    <Image className='rounded-md' src={item?.Thumbnail} width={50} height={50} alt={item?.Dish.Name} />
                    <div>
                        <p>{item?.Dish.Name}</p>
                        <p>{item?.Dish.Price.toLocaleString()} VND</p>
                    </div>
                </div>
                <div className='w-24 h-fit flex justify-between'>
                    <button
                        onClick={() => handleChangeQuantity(-1, item!)}
                        className='px-1 border border-gray-300 hover:bg-gray-200 duration-200 rounded'><MinusOutlined /></button>
                    <p>{quantity}</p>
                    <button
                        onClick={() => handleChangeQuantity(1, item!)}
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
                                setQuantity(item!.Quantity);
                            }}
                            className='border rounded-lg p-2 px-4 text-black hover:text-black hover:border-blue-600'>
                            Cancel
                        </button>
                        <button
                            onClick={() => handleDelete(item!.Id!)}
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

export default CartSubItem