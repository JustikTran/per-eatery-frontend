import { AuthContext } from '@/contexts/AuthContext';
import { sendRequest } from '@/utils/api';
import { EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Image, message, Popconfirm, Space, Switch, Table, TableColumnsType, Tag } from 'antd';
import Link from 'next/link';
import React, { useContext, useState } from 'react'

interface IData {
    total: number,
    loading: boolean,
    dishes: IDish[],
    getDishes: () => void,
    onPagination: (skip: number, top: number) => void,
    setCurrent: (dish: IDish) => void,
    showUpdate: () => void
}

const DishTable = ({
    total,
    loading,
    dishes,
    getDishes,
    onPagination,
    setCurrent,
    showUpdate }: IData) => {
    const { accessToken } = useContext(AuthContext) ?? {};
    const [skip, setSkip] = useState<number>(0);

    const columns: TableColumnsType<IDish> = [
        {
            title: 'Tên món ăn',
            dataIndex: 'Name',
            key: 'name',
            render: (name: string, record: IDish) => (
                <Link
                    href={`/dashboard/dish/${record.Id}`}
                    className="text-black cursor-pointer hover:underline hover:text-black">
                    {name}
                </Link>
            )
        },

        {
            title: 'Ảnh minh họa',
            dataIndex: 'Image',
            key: 'image',
            render: (imageUri: string) => (
                <Image height={'60px'} alt='product image' src={imageUri} />
            )
        },
        {
            title: 'Giá (VNĐ)',
            dataIndex: 'Price',
            key: 'price',
            render: (price: number) => price.toLocaleString(),
        },
        {
            title: 'Tình trạng kho',
            dataIndex: 'InStock',
            key: 'inStock',
            render: (_: unknown, record: IDish) => (
                <Switch
                    checked={record.InStock}
                    checkedChildren="Còn hàng"
                    unCheckedChildren="Hết hàng"
                    style={{
                        backgroundColor: record.InStock ? "#1677ff" : "#d9d9d9",
                    }}
                    onChange={() => {
                        // Gọi API update trạng thái
                        handleToggleStatus(record);
                    }}
                />
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'IsDeleted',
            key: 'isDeleted',
            render: (isDeleted: boolean) => (
                isDeleted ?
                    <Tag color='error'>Ngừng kinh doanh</Tag>
                    : <Tag color='processing'>Đang kinh doanh</Tag>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (_: unknown, record: IDish) => (
                !record.IsDeleted && <Space>
                    <div>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => {
                                setCurrent(record);
                                showUpdate();
                            }}
                        >
                            Sửa
                        </Button>
                    </div>

                    <Popconfirm
                        title="Xóa món ăn"
                        description="Xác nhận muốn xóa món ăn?"
                        cancelText="Hủy"
                        okText="Xác nhận"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => handleDelete(record.Id)}
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ]

    const handleDelete = async (dishId: string) => {
        try {
            // setLoading(true);
            const res = await sendRequest<IBackendRes<IDish>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/dish/id=${dishId}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (res.StatusCode == 200) {
                message.success("Xóa món ăn thành công.");
                await getDishes();
            } else {
                message.error("Xóa món ăn thất bại.");
            }
        } catch {
            message.error("Xóa món ăn thất bại.");
        }
        finally {
            // setLoading(false);
        }
    }

    const handleToggleStatus = async (dish: IDish) => {
        try {
            const payload = {
                Id: dish.Id,
                Name: dish.Name,
                InStock: !dish.InStock,
                Description: dish.Description,
                Price: dish.Price,
                Image: dish.Image,
                Type: dish.Type
            }
            const res = await sendRequest<IBackendRes<IDish>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/dish/id=${dish.Id}`,
                method: "PUT",
                headers: { Authorization: `Bearer ${accessToken}` },
                body: payload
            });
            if (res.StatusCode == 200) {
                message.success("Cập nhật trạng thái thành công");
                getDishes();
            } else {
                message.error("Cập nhật trạng thái thất bại");
            }
        } catch (err) {
            console.error(err);
            message.error("Cập nhật trạng thái thất bại");
        }
    };


    return (
        <Table
            loading={loading}
            style={{ marginTop: 8, backgroundColor: 'transparent' }}
            columns={columns}
            dataSource={dishes}
            pagination={{
                current: skip / 4 + 1,
                total: total,
                pageSize: 4,
                defaultCurrent: 1,
                onChange: async (page, pageSize) => {
                    const newSkip = (page - 1) * pageSize;
                    setSkip(newSkip);
                    await onPagination(newSkip, 5);
                },
            }}
        />
    )
}

export default DishTable