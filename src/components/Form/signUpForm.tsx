import { sendRequest } from '@/utils/api'
import { Card, Divider, Form, Input } from 'antd'
import Link from 'next/link'
import React from 'react'

interface IData {
    OnSubmit: (data: IReqUser) => void
}

const SignUpForm = ({ OnSubmit }: IData) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        const formData = form.getFieldsValue();
        const payload: IReqUser = {
            Username: formData.username,
            Password: formData.password,
            Email: formData.email,
            Phone: formData.phoneNumber,
            Role: "User"
        }
        OnSubmit(payload);
    }

    const checkUnique = async (field: string, value: string) => {
        if (!value) return Promise.resolve();
        try {
            const res = await sendRequest<IBackendRes<IUser>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/user/${field}=${value}`,
                method: "GET",
            });
            
            if (res.data) {
                return Promise.reject(`${res.message}`);
            }
            return Promise.resolve();
        } catch {
            return Promise.reject("Can not check this value, please try again.");
        }
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
                    <h1 className='uppercase text-center font-bold text-2xl my-6'>Sign up</h1>
                    <>
                        <Form.Item
                            label="Username"
                            name="username"
                            validateTrigger="onBlur"
                            rules={[
                                { required: true, message: 'Please input your username!' },
                                {
                                    validator: (_, value) => checkUnique("username", value),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve(); // đã có required check ở trên
                                        if (value.length < 8) {
                                            return Promise.reject(new Error('Password must be at least 8 characters!'));
                                        }
                                        if (!/[0-9]/.test(value)) {
                                            return Promise.reject(new Error('Password must contain at least 1 digit!'));
                                        }
                                        if (!/[!@#$%^&*]/.test(value)) {
                                            return Promise.reject(new Error('Password must contain at least 1 special character!'));
                                        }
                                        return Promise.resolve();
                                    },
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Confirm"
                            name="confirm"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please input confirm password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The confirm password does not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            validateTrigger="onBlur"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'The input is not a valid email!' },
                                {
                                    validator: (_, value) => checkUnique("email", value),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone number"
                            name="phoneNumber"
                            validateTrigger="onBlur"
                            rules={[
                                { required: true, message: 'Please input your phone number!' },
                                {
                                    pattern: /^[0-9]{9,11}$/,
                                    message: 'Phone number must be 9–11 digits!',
                                },
                                {
                                    validator: (_, value) => checkUnique("phone", value),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    <button
                        type='submit'
                        className='w-full my-4 border border-gray-300 rounded-lg py-1.5 font-medium text-center hover:shadow-md hover:border-gray-500 duration-300 ease-in-out'>
                        Sign up
                    </button>
                </Form>
                <Divider style={{ borderColor: '#4b5563' }} />
                <p className='text-center'> You already have account <Link className='text-black font-bold hover:text-black hover:underline' href={'/auth/sign-in'}>Sign In</Link>.</p>
            </Card>
        </div>
    )
}

export default SignUpForm