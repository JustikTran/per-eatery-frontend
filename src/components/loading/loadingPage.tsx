import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

interface IMessage {
    message: string
}

const LoadingPage = ({ message }: IMessage) => {
    return (
        <div className='w-full flex items-center justify-center h-[60vh] space-x-4'>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'black' }} spin allowFullScreen={true} />} />
            <span className='text-lg'>{message}</span>
        </div>
    )
}

export default LoadingPage