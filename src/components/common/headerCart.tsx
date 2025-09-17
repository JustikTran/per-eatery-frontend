"use client";

import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Link from 'next/link';
import React from 'react'

const HeaderCart = () => {
    return (
        <Link className='text-gray-900 hover:text-gray-500' href={'/cart'}>
            <Badge count={0} size='small'>
                <ShoppingCartOutlined className='text-2xl' />
            </Badge>
        </Link>
    )
}

export default HeaderCart