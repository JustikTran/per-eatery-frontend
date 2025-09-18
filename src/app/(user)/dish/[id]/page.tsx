"use client";

import UserDishDetail from '@/components/dish/user.dishDetail';
import LoadingPage from '@/components/loading/loadingPage';
import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { Card, Col, Image, Row } from 'antd'
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const DishDetailPage = () => {
  const { user } = useContext(AuthContext) ?? {};
  const [loading, setLoading] = useState<boolean>(true);
  const [dish, setDish] = useState<IDish | null>(null);
  const { id } = useParams();

  const getDish = async () => {
    try {
      setLoading(true);
      const res = await sendRequest<IBackendRes<IDish>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/dish/id=${id}`,
        method: "GET"
      })

      setDish(res.Data ?? null);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDish();
  }, [id]);

  if (loading)
    return (
      <LoadingPage message='Loading dish...' />
    )

  return (
    <div className='p-5 w-[80%] m-auto space-y-4'>
      {
        dish ?
          <Card className='shadow-lg'>
            <Row gutter={[8, 8]}>
              <Col span={12} >
                <Image src={dish.Image} alt={dish.Name} />
              </Col>
              <Col span={12} >
                <UserDishDetail dish={dish} />
              </Col>
            </Row>
          </Card>

          :
          <></>
      }

      <div>
        <p>Recommend dish:</p>
      </div>
    </div>
  )
}

export default DishDetailPage