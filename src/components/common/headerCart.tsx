"use client";

import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

const HeaderCart = () => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const getCount = async () => {
            try {
                const res = await sendRequest<IBackendOdataRes<object>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/cart`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    queryParams: {
                        $count: true,
                    }
                })

                setCount(res['@odata.count'] ?? res.value.length);
            } catch (error) {
                console.error(error);
            }
        }

        getCount();
    }, [accessToken]);

    return (
        <Link className='text-gray-900 hover:text-gray-500' href={'/cart'}>
            <Tooltip placement="bottomRight" title={'Cart'}>
                <Badge count={count} size='small'>
                    <ShoppingCartOutlined className='text-2xl' />
                </Badge>
            </Tooltip>

        </Link>
    )
}

export default HeaderCart