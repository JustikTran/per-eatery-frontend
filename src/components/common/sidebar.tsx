"use client";

import { AppstoreOutlined, CoffeeOutlined, DollarOutlined, MessageOutlined, OrderedListOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const menuItems = [
    {
        key: "/dashboard",
        icon: <AppstoreOutlined />,
        label: <Link href={'/dashboard'}>Tổng quan</Link>,
    },
    {
        key: "/dashboard/dish",
        icon: <CoffeeOutlined />,
        label: <Link href={'/dashboard/dish'}>Quản lý món ăn</Link>,
    },
    {
        key: "/dashboard/side-dish",
        icon: <OrderedListOutlined />,
        label: <Link href={'/dashboard/side-dish'}>Quản lý món phụ</Link>,
    },
    {
        key: "/dashboard/user",
        icon: <UserOutlined />,
        label: <Link href={'dashboard/user'}>Quản lý người dùng</Link>,
    },
    {
        key: "/dashboard/order",
        icon: <ShoppingCartOutlined />,
        label: <Link href={'/dashboard/order'}>Quản lý đơn hàng</Link>,
    },
    {
        key: "/dashboard/payment",
        icon: <DollarOutlined />,
        label: <Link href={'/dashboard/payment'}>Quản lý thanh toán</Link>,
    },
    {
        key: "/dashboard/message",
        icon: <MessageOutlined />,
        label: <Link href={'/dashboard/message'}>Tin nhắn</Link>,
    },
];

const Sidebar = () => {
    const pathName = usePathname();
    const matchedKeys = menuItems
        .map(item => item.key)
        .filter(key => pathName.startsWith(key));
    const matchedKey = matchedKeys.sort((a, b) => b.length - a.length)[0] ?? "";
    return (
        <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            selectedKeys={[matchedKey]}
        />
    );
}

export default Sidebar