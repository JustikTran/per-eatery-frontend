"use client";

import LoadingItem from '@/components/loading/loadingItem';
import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react'

interface IData {
    address: IAddress,
    onReload: () => void,
    onClose: () => void
}

const ModalUpdateAddress = ({
    address,
    onReload,
    onClose
}: IData) => {
    const { accessToken, user } = useContext(AuthContext) ?? {};
    const [loading, setLoading] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            receiver: address.Receiver,
            address: address.Address,
            phoneNumber: address.Phone
        })
    }, [])

    const OnFinishForm = async () => {
        try {
            setLoading(true);

            const formData = form.getFieldsValue();
            const payload = {
                Id: address.Id,
                UserId: user?.Id,
                Receiver: formData.receiver,
                Phone: formData.phoneNumber,
                Address: formData.address,
                IsDefault: checked
            }

            const res = await sendRequest<IBackendRes<IAddress>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/address/id=${address.Id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: payload
            })

            if (res.StatusCode == 200 || res.statusCode == 200) {
                onReload();
                onClose();
            } else {
                api.error({
                    type: 'error',
                    message: 'Update address fail.',
                    description: `${res.Message || res.message}`,
                    showProgress: false,
                    duration: 2
                });
            }

        } catch (error) {
            console.error(error);
            api.error({
                type: 'error',
                message: 'Update address fail.',
                description: `${error}`,
                showProgress: false,
                duration: 2
            })
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <LoadingItem notifyLoading='Creating...' />
        )
    }

    return (
        <div>
            {contextHolder}
            <Form
                layout='horizontal'
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 800, display: 'flex', flexDirection: 'column' }}
                clearOnDestroy={true}
                requiredMark={false}
                onFinish={() => OnFinishForm()}
            >
                <Form.Item label='Receiver name' name={"receiver"} rules={[{ required: true, message: "Please input your receive name." }]}>
                    <Input maxLength={20} />
                </Form.Item>
                <Form.Item label='Address' name={"address"} rules={[{ required: true, message: "Please input your address." }]}>
                    <Input maxLength={50} />
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
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Default address" name="isDefault" valuePropName="checked">
                    <Checkbox defaultChecked={address.IsDefault} onChange={(e) => setChecked(e.target.checked)}></Checkbox>
                </Form.Item>
                <Button className='items-end hover:!border-gray-600 hover:!text-black hover:!bg-gray-200' type="default" htmlType='submit'>
                    Update address
                </Button>
            </Form>
        </div>
    )
}

export default ModalUpdateAddress