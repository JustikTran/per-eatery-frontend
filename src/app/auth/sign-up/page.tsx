"use client";

import SignUpForm from '@/components/form/signUpForm'
import { sendRequest } from '@/utils/api';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react'

const SignUpPage = () => {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

    const handleSignUp = async (data: IReqUser) => {
        try {
            const res = await sendRequest<IBackendRes<IUser>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/auth/sign-up`,
                method: "POST",
                body: data
            })

            if (res.StatusCode == 201) {
                api.open({
                    type: 'success',
                    message: 'Sign up Notification',
                    description: `Your account is created.`,
                    showProgress: false,
                    duration: 2
                });
                router.push('/auth/sign-in');
            } else {
                api.open({
                    type: 'warning',
                    message: 'Sign up Notification',
                    description: `${res.Message}`,
                    showProgress: false,
                    duration: 2
                });
            }

        } catch (error) {
            api.open({
                type: 'error',
                message: 'Sign up Notification',
                description: `${error}`,
                showProgress: false,
                duration: 2
            });
        }
    }

    return (
        <>
            {contextHolder}
            <SignUpForm
                OnSubmit={handleSignUp}
            />
        </>
    )
}

export default SignUpPage