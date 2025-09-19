"use client";

import UserSideDishItem from '@/components/dish/item/user.sideDish';
import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { Col, Divider, Empty, notification, Row, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react'

interface IData {
    dish: IDish
}

const UserDishDetail = ({ dish }: IData) => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useContext(AuthContext) ?? {};
    const [topping, setTopping] = useState<IDish[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const [cartItems, setCartItems] = useState<ICartItemCreate[]>([]);

    const getSideDishes = async () => {
        try {
            setLoading(true);
            const res = await sendRequest<IBackendOdataRes<IDish>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/dish`,
                method: "GET",
                queryParams: {
                    $filter: "Type eq 'minor'"
                }
            })
            setTopping(res.value);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleAddToCart = async () => {
        try {
            setLoading(true);

            if (!user) {
                api.open({
                    type: 'warning',
                    message: 'You must sign in to add this dish to your cart.',
                    showProgress: false,
                    duration: 2
                });
                return;
            }

            const payload = {
                UserId: user?.Id,
                Thumbnail: dish.Image,
                Items: [...cartItems, {
                    DishId: dish.Id,
                    Quantity: 1,
                    Thumbnail: dish.Image,
                }]
            }

            const res = await sendRequest<IBackendRes<object>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/cart/create`,
                method: "POST",
                headers: { Authorization: `Bearer ${accessToken}` },
                body: payload
            })

            if (res.StatusCode == 201 || res.StatusCode == 201)
                api.open({
                    type: 'success',
                    message: 'Add dish to cart successfully.',
                    showProgress: false,
                    duration: 2
                });
            else {
                api.open({
                    type: 'warning',
                    message: 'Add dish to cart failure.',
                    showProgress: false,
                    duration: 2
                });
            }
        } catch (error) {
            console.error(error);
            api.open({
                type: 'error',
                message: 'Add dish to cart failure.',
                showProgress: false,
                duration: 2
            });
        } finally {
            setLoading(false);
        }
    }

    const handleBuy = () => {

    }

    const handleAddSideDish = (sideDish: IDish, quantity: number) => {
        const item: ICartItemCreate = {
            DishId: sideDish.Id,
            Quantity: quantity,
            Thumbnail: sideDish.Image,
        }
        setCartItems(prev => {
            const exist = prev.some(ci => ci.DishId === sideDish.Id);
            return exist
                ? prev.map(ci => ci.DishId === sideDish.Id ? item : ci)
                : [...prev, item];
        });
    }

    const handleRemoveSideDish = (sideDish: IDish) => {
        setCartItems(prev => prev.filter(ci => ci.DishId !== sideDish.Id));
    }

    useEffect(() => {
        getSideDishes();
    }, []);

    return (
        <div>
            {contextHolder}
            <div className='flex items-center space-x-4'>
                <p className='text-3xl font-bold uppercase'>{dish.Name}</p>
                {
                    dish.IsDeleted && <Tag className='text-lg' color='error'>Discontinue a product</Tag>
                }
            </div>
            <p className='my-5 text-5xl font-medium'>{dish.Price.toLocaleString()}VND</p>
            <div>
                <p className='font-bold text-lg'>Description:</p>
                <p className='my-2'>{dish.Description}</p>
            </div>
            <Divider />
            {
                !dish.IsDeleted && <div>
                    <p className='uppercase font-bold text-lg mb-2'>Side dishes:</p>
                    <Row gutter={[16, 16]}>
                        {
                            topping.length > 0 ? topping.map((item) => (
                                <Col span={12} key={item.Id}>
                                    <UserSideDishItem
                                        sideDish={item}
                                        onAdd={handleAddSideDish}
                                        onRemove={handleRemoveSideDish} />
                                </Col>
                            ))
                                :
                                <Empty />
                        }
                    </Row>
                    <Divider />
                </div>
            }

            {
                user?.Role !== "Admin" && !dish.IsDeleted &&
                <>
                    <div className='flex justify-end space-x-4'>
                        <button
                            onClick={handleAddToCart}
                            className='hover:bg-gray-300 duration-300 ease-in-out border rounded-lg py-2 px-4 border-gray-600 disabled:bg-gray-300'
                            disabled={loading}>Add to cart</button>
                        <button
                            onClick={handleBuy}
                            className='bg-gray-500 text-white hover:bg-gray-700 disabled:bg-gray-700 duration-300 ease-in-out border rounded-lg py-2 px-4 border-gray-600'
                            disabled={loading}>Buy now</button>
                    </div>
                </>
            }
        </div>
    )
}

export default UserDishDetail