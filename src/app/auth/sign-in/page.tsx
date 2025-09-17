"use client";

import LoginForm from '@/components/form/loginForm';
import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const SignInPage = () => {
    const { login } = useContext(AuthContext) ?? {};
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();

    const handleSubmit = async (username: string, password: string) => {
        try {
            const payload = {
                Username: username,
                Password: password
            }

            const res = await sendRequest<IBackendRes<{ accessToken: string }>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/auth/sign-in`,
                method: "POST",
                body: payload
            })

            if (res.StatusCode == 200 && res.Data?.accessToken) {
                console.log(res.Data.accessToken);
                
                login?.(res.Data?.accessToken);
                router.push('/');
            }
            else {
                api.open({
                    type: 'warning',
                    message: 'Sign In Notification',
                    description: `${res.Message}`,
                    showProgress: false,
                    duration: 2
                });
            }


        } catch (error) {
            api.open({
                type: 'error',
                message: 'Sign In Notification',
                description: `${error}`,
                showProgress: false,
                duration: 2
            });
        }
    }

    return (
        <>
            {contextHolder}
            <LoginForm
                OnSubmit={handleSubmit}
            />
        </>
    )
}

export default SignInPage