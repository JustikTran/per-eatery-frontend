"use client";

import React from 'react'
import { Card, Divider, Form, Input } from 'antd';
import Link from 'next/link';
import { FaFacebook } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

interface IFormData {
    OnSubmit: (username: string, password: string) => void
}

const LoginForm = ({ OnSubmit }: IFormData) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        const formData = form.getFieldsValue();
        OnSubmit(formData.username, formData.password);
    }
    return (
        <div className='bg-slate-900 min-h-screen flex flex-col justify-center items-center'>
            <Card
                className='w-[50vw] lg:w-[30vw] shadow-lg shadow-slate-50'
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    requiredMark={false}
                    autoComplete="off"
                >
                    <h1 className='uppercase text-center font-bold text-2xl my-6'>Sign in</h1>
                    <>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </>
                    <button
                        className='w-full my-4 border border-gray-300 rounded-lg py-1.5 font-medium text-center hover:shadow-md hover:border-gray-500 duration-300 ease-in-out'
                        type='submit'>
                        Sign in
                    </button>
                </Form>
                <Divider style={{ borderColor: '#4b5563' }}>Or</Divider>
                <ul className='flex items-center justify-center space-x-4'>
                    <li className='border rounded-full py-1 px-2'>
                        <Link className='flex items-center text-black hover:text-black' href={''}><FaFacebook /><span>Facebook</span></Link>
                    </li>
                    <li className='border rounded-full py-1 px-2'>
                        <Link className='flex items-center text-black hover:text-black' href={''}><SiGmail /> <span>Gmail</span></Link>
                    </li>
                </ul>
                <Divider style={{ borderColor: '#4b5563' }} />
                <p className='text-center'>Do not have account? <Link className='text-black font-bold hover:text-black hover:underline' href={'/auth/sign-up'}>Sign Up</Link>.</p>
            </Card>
        </div>
    )
}

export default LoginForm