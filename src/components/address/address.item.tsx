"use client";

import ModalUpdateAddress from '@/components/modal/modal.update.address';
import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Card, Modal, Spin, Tag, Tooltip } from 'antd';
import React, { useContext, useState } from 'react'

interface IData {
    address: IAddress,
    onReload: () => void
}

const AddressItem = ({ address, onReload }: IData) => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleDelete = async (id: string) => {
        try {
            setConfirmLoading(true);
            const res = await sendRequest<IBackendRes<object>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/address/id=${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            if (res.statusCode == 200 || res.StatusCode == 200) {
                onReload();
                setShowDelete(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setConfirmLoading(false);
        }
    }

    return (
        <div className='mb-1'>
            <Card className='shadow' hoverable>
                <div className='flex justify-between items-center'>
                    <div>
                        <p>Receiver: <span className='font-bold uppercase'>{address.Receiver}</span>
                            {
                                address.IsDefault && <Tag className='ml-1' color='geekblue'>Default</Tag>
                            }</p>
                        <p>Address: <span className='font-bold'>{address.Address}</span></p>
                    </div>

                    <div className=' flex space-x-4'>
                        <Tooltip placement="bottomRight" title={'Update'}>
                            <button
                                onClick={() => setShowModal(true)}
                                className='text-lg hover:text-blue-800 duration-200 ease-in'><EditOutlined /></button>
                        </Tooltip>

                        <Tooltip placement="bottomRight" title={'Delete'}>
                            <button
                                onClick={() => setShowDelete(true)}
                                className='text-lg hover:text-red-800 duration-200 ease-in'><DeleteOutlined /></button>
                        </Tooltip>

                    </div>
                </div>

            </Card>
            <Modal
                key={0}
                title={"Update address receive"}
                footer={null}
                centered
                onCancel={() => setShowModal(false)}
                destroyOnClose={true}
                visible={showModal}>
                <ModalUpdateAddress
                    address={address}
                    onClose={() => setShowModal(false)}
                    onReload={onReload}
                />
            </Modal>
            <Modal
                key={0}
                title={"Confirm delete address"}
                footer={null}
                onCancel={() => setShowDelete(false)}
                destroyOnClose={true}
                visible={showDelete}>
                <div className='space-y-2'>
                    <p>Are you sure delete this item?</p>
                    <div className='flex justify-end space-x-4'>
                        <button
                            className='border rounded-lg p-2 px-4 text-black hover:text-black hover:border-blue-600'>
                            Cancel
                        </button>
                        <button
                            onClick={() => handleDelete(address.Id)}
                            className='flex items-center space-x-1 border rounded-lg p-2 px-4 bg-blue-600 text-white hover:text-white hover:border-white'>
                            <Spin spinning={confirmLoading} indicator={<LoadingOutlined style={{ color: 'white' }} spin />}>
                            </Spin>
                            <span>Ok</span>
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AddressItem