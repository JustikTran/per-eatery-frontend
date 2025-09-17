"use client"

import { AuthContext } from '@/contexts/AuthContext';
import { LogoutOutlined, ProfileOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Drawer } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

const UserDrawer = () => {
    const { user, logout } = useContext(AuthContext) ?? {};
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const RouteTo = (path: string) => {
        router.push(path);
    }
    return (
        <>
            <button onClick={showDrawer}>
                {user?.Username}
            </button>
            <Drawer
                title={user?.Username}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={open}
                width={320}
            >
                <div className='flex flex-col space-y-6'>
                    <p className='cursor-pointer hover:bg-gray-200 border py-2 px-2 rounded-xl duration-200 ease-in-out' onClick={() => RouteTo('/profile')}><ProfileOutlined /> Profile</p>
                    <p className='cursor-pointer hover:bg-gray-200 border py-2 px-2 rounded-xl duration-200 ease-in-out' onClick={logout}><SettingOutlined /> Setting</p>
                </div>
                <Divider />
                <p className='cursor-pointer hover:bg-gray-200 border py-2 px-2 rounded-xl duration-200 ease-in-out' onClick={logout}><LogoutOutlined /> Logout</p>
            </Drawer>
        </>
    )
}

export default UserDrawer