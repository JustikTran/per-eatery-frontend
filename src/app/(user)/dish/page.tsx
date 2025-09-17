"use client";

import UserDish from '@/components/dish/userDish';
import LoadingPage from '@/components/loading/loadingPage'
import { sendRequest } from '@/utils/api';
import React, { useEffect, useState } from 'react'

const DishPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dishes, setDishes] = useState<IDish[]>([]);

    const getDishes = async () => {
        try {
            setLoading(true);
            const res = await sendRequest<IBackendOdataRes<IDish>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/dish`,
                method: "GET",
                queryParams: {
                    $filter: "Type eq 'major'"
                }
            })
            setDishes(res.value);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDishes()
    }, []);

    if (loading)
        return (
            <div className='p-5'>
                <LoadingPage message='Loading dishes...' />
            </div>
        )
    return (
        <div className='p-5'>
            <UserDish listDishes={dishes} />
        </div>
    )
}

export default DishPage