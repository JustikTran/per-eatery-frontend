import { AuthContext } from '@/contexts/AuthContext';
import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';
import React, { useContext } from 'react'

const AdminProfile = () => {
    const { logout } = useContext(AuthContext) ?? {};

    const items: MenuProps['items'] = [
        {
            label: (
                <a className='flex space-x-2'>
                    <ProfileOutlined />
                    <span>Profile</span>
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a className='flex space-x-2' href={'/'}>
                    <HomeOutlined />
                    <span>Home</span>
                </a>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a className='flex space-x-2' onClick={logout}>
                    <LogoutOutlined />
                    <span>Logout</span>
                </a>
            ),
            key: '3',
        },
    ];
    return (
        <div className='px-4'>
            <Dropdown menu={{ items }} trigger={['click']}>
                <button onClick={(e) => e.preventDefault()}>
                    <Space>
                        Admin
                        <UserOutlined />
                    </Space>
                </button>
            </Dropdown>
        </div>
    )
}

export default AdminProfile