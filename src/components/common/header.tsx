"use client";

import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link'
import React, { useContext } from 'react'
import { Input } from 'antd';
import { usePathname } from 'next/navigation';
import UserDrawer from '@/components/common/userDrawer';
import HeaderCart from '@/components/common/headerCart';
import Message from '@/components/button/message';

const CpnHeader = () => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/dish", label: "Dish" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
    ];
    return (
        <div className='flex items-center justify-between'>
            <Link className='text-3xl font-black text-black hover:text-black' href={'/'}>Eatery</Link>
            <ul className="flex justify-center space-x-6">
                {links.map((link) => {
                    const isActive =
                        link.href === "/"
                            ? pathname === "/" // Home chỉ active khi đúng "/"
                            : pathname.startsWith(link.href);

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`text-black font-bold hover:text-black hover:underline ${isActive ? "underline" : ""
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Input className='!w-[80vw] md:!w-[25vw] hover:!border-gray-700 focus-visible:!border-gray-700 focus-visible:!shadow-gray-700' placeholder="Search dish" />
            {
                accessToken ? <>
                    <div className='flex items-center space-x-6'>
                        <Message />
                        <HeaderCart />
                        <UserDrawer />
                    </div>
                </>
                    :
                    <>
                        <div className='flex items-center space-x-4 font-bold'>
                            <Link href={'/auth/sign-in'}
                                className='text-black hover:text-black hover:underline'
                            >Sign in</Link>
                            <Link href={'/auth/sign-up'}
                                className='text-black hover:text-black hover:underline'
                            >Sign Up</Link>
                        </div>
                    </>
            }
        </div>
    )
}

export default CpnHeader