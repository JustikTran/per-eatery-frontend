"use client";

import ModalAddDish from '@/components/modal/modal.add.dish';
import DishTable from '@/components/table/dishTable'
import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { PlusOutlined } from '@ant-design/icons'
import { message, Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react'

const ManageDishPage = () => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const [loading, setLoading] = useState<boolean>(false);
    const [dishes, setDishes] = useState<IDish[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [current, setCurrent] = useState<IDish | null>(null);
    const [total, setTotal] = useState<number>(0);

    const getDishes = async () => {
        try {
            setLoading(true);
            const res = await sendRequest<IBackendOdataRes<IDish>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/dish`,
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
                queryParams: {
                    $filter: "Type eq 'major'",
                    $top: 4,
                    $count: true
                }
            })

            setDishes(res.value ?? []);
            setTotal(res['@odata.count'] || dishes.length);

        } catch {
            message.error("Lỗi máy chủ. Không thể thực hiện lấy dữ liệu món ăn.");
        } finally {
            setLoading(false);
        }
    }

    const getPagination = async (skip: number, top: number) => {
        if (!accessToken) return;
        const res = await sendRequest<IBackendOdataRes<IDish>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/dish`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            queryParams: {
                $top: top,
                $skip: skip,
                $count: true,
            }
        });

        console.log(res.value);

        if (res.value) {
            setDishes(res.value);
            setTotal(res['@odata.count'] || dishes.length);
        }
    }

    useEffect(() => {
        getDishes();
    }, [accessToken]);

    return (
        <div>
            <p className='text-lg font-bold'>Danh sách món chính</p>
            <button
                onClick={() => setShowModal(true)}
                className='my-3 border p-1.5 rounded-md border-gray-800 hover:bg-gray-800 hover:text-white hover:shadow-md duration-200 ease-in-out'
            ><PlusOutlined /> Thêm món ăn mới</button>
            <DishTable
                total={total}
                dishes={dishes}
                getDishes={getDishes}
                loading={loading}
                setCurrent={setCurrent}
                showUpdate={() => setShowUpdateModal(true)}
                onPagination={getPagination} />
            <Modal
                key={0}
                title={"Thêm món ăn mới"}
                footer={null}
                centered
                onCancel={() => setShowModal(false)}
                destroyOnClose={true}
                visible={showModal}>
                <ModalAddDish
                    onClose={() => setShowModal(false)}
                    onReload={() => getDishes()} />
            </Modal>
            <Modal
                key={current?.Id}
                title={"Cập nhật món ăn"}
                footer={null}
                centered
                onCancel={() => setShowUpdateModal(false)}
                destroyOnClose={true}
                visible={showUpdateModal}>
            </Modal>
        </div >
    )
}

export default ManageDishPage