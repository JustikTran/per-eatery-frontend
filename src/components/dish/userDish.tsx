"use client";

import UserDishListItem from '@/components/dish/userDish.listItem';
import { Col, Row } from 'antd';
import React from 'react'

interface IData {
    listDishes: IDish[]
}

const UserDish = ({ listDishes }: IData) => {

    if (listDishes.length < 0)
        return (
            <>
            </>
        )


    return (
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {
                    listDishes.map((item) => (
                        <Col key={item.Id} className="gutter-row mb-4" span={6}>
                            <UserDishListItem key={item.Id} dish={item} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default UserDish