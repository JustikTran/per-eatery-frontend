"use client";

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import React, { useEffect, useState } from 'react'

interface IData {
    sideDish: IDish;
    onAdd: (sideDish: IDish, quantity: number) => void;
    onRemove: (sideDish: IDish) => void
}

const UserSideDishItem = ({ sideDish, onAdd, onRemove }: IData) => {
    const [quantity, setQuantity] = useState<number>(0);

    const handleChangeQuantity = (value: number) => {
        setQuantity(quantity + value);
    }

    useEffect(() => {
        if (quantity > 0)
            onAdd(sideDish, quantity)
        else
            onRemove(sideDish)
    }, [quantity]);

    return (
        <div className='h-30 flex justify-between'>
            <Image height={100} width={120} src={sideDish.Image} alt={sideDish.Name} />
            <div className='w-[50%] flex flex-col justify-between'>
                <div>
                    <p className='font-bold'>{sideDish.Name}</p>
                    <p>{sideDish.Price.toLocaleString()} VND</p>
                </div>

                <div className='flex justify-between'>
                    <button
                        onClick={() => handleChangeQuantity(-1)}
                        className='px-1 border rounded'
                        disabled={quantity == 0}><MinusOutlined /></button>
                    <p>{quantity}</p>
                    <button
                        onClick={() => handleChangeQuantity(1)}
                        className='px-1 border rounded'><PlusOutlined /></button>
                </div>
            </div>
        </div>
    )
}

export default UserSideDishItem