"use client";

import { ArrowRightOutlined } from '@ant-design/icons';
import { Card, Divider, Image } from 'antd';
import Link from 'next/link';
import React from 'react'

interface IData {
    dish: IDish
}

const UserDishListItem = ({ dish }: IData) => {
    return (
        <div>
            <Card hoverable={true}>
                <div className='flex justify-center'>
                    <Image src={dish.Image} height={200} width={250} alt={dish.Name} />
                </div>
                <Divider />
                <div className='flex justify-between items-end'>
                    <div>
                        <p className='font-bold text-lg'>{dish.Name}</p>
                        <p className='font-bold text-2xl'>{dish.Price.toLocaleString()} VND</p>
                    </div>
                    <Link className='space-x-1' href={`/dish/${dish.Id}`}><span>View detail</span> <ArrowRightOutlined /></Link>
                </div>
            </Card>
        </div>
    )
}

export default UserDishListItem