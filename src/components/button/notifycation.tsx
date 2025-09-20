"use client";

import { AuthContext } from '@/contexts/AuthContext';
import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';
import Link from 'next/link';
import React, { useContext, useState } from 'react'

const NotificationButton = () => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const [count, setCount] = useState<number>(0);
    return (
        <div>
            <Link className='text-gray-900 hover:text-gray-500' href={'/'}>
                <Tooltip placement="bottomRight" title={'Notification'}>
                    <Badge count={count} size='small'>
                        <NotificationOutlined className='text-2xl' />
                    </Badge>
                </Tooltip>

            </Link>
        </div>
    )
}

export default NotificationButton