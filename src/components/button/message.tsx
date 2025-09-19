"use client";

import { AuthContext } from '@/contexts/AuthContext';
import { MessageOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';
import Link from 'next/link';
import React, { useContext, useState } from 'react'

const Message = () => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const [count, setCount] = useState<number>(0);
    return (
        <div>
            <Link className='text-gray-900 hover:text-gray-500' href={'/'}>
                <Tooltip placement="bottomRight" title={'Message'}>
                    <Badge count={count} size='small'>
                        <MessageOutlined className='text-2xl' />
                    </Badge>
                </Tooltip>

            </Link>
        </div>
    )
}

export default Message