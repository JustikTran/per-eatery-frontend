"use client"

import AddressItem from '@/components/address/address.item'
import LoadingPage from '@/components/loading/loadingPage'
import ModalAddAddress from '@/components/modal/modal.add.address'
import { AuthContext } from '@/contexts/AuthContext'
import { sendRequest } from '@/utils/api'
import { Divider, Empty, Modal, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const AddressReceivePage = () => {
  const { accessToken, user } = useContext(AuthContext) ?? {};
  const [loading, setLoading] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const getAddresses = async () => {
    try {
      setLoading(true);
      const res = await sendRequest<IBackendOdataRes<IAddress>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND}/odata/address`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        queryParams: {
          $filter: `UserId eq '${user?.Id}'`,
          $orderby: "IsDefault desc"
        }
      })

      setAddresses(res.value ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!accessToken || !user) return;
    getAddresses();
  }, [accessToken, user])

  if (loading) {
    return (
      <LoadingPage message='Loading address...' />
    );
  }

  if (addresses.length == 0) {
    return (
      <div className='p-5'>
        <Divider orientation="left" style={{ borderColor: '#333' }} plain>
          <p className='font-bold text-2xl'>My address</p>
        </Divider>
        <Empty
          description={
            <Typography.Text>
              Your category address is empty.
            </Typography.Text>
          }
        >
          <button onClick={() => setShowModal(true)}
            className='py-1.5 px-2 hover:bg-gray-500 hover:text-white duration-200 ease-in border border-gray-500 rounded-lg'
          >Create Now</button>
        </Empty>

        <Modal
          key={0}
          title={"Add new address receive"}
          footer={null}
          centered
          onCancel={() => setShowModal(false)}
          destroyOnClose={true}
          visible={showModal}>
          <ModalAddAddress
            onClose={getAddresses}
            onReload={() => setShowModal(false)}
          />
        </Modal>
      </div>
    )
  }

  return (
    <div className='p-5'>
      <Divider orientation="left" style={{ borderColor: '#333' }} plain>
        <p className='font-bold text-2xl'>My address</p>
      </Divider>
      <button onClick={() => setShowModal(true)}
        className='py-1.5 px-2 mb-4 hover:bg-gray-500 hover:text-white duration-200 ease-in border border-gray-500 rounded-lg'
      >Create Now</button>
      {
        addresses.map((item) => (
          <AddressItem
            key={item.Id}
            onReload={getAddresses}
            address={item} />
        ))
      }
      <Modal
        key={0}
        title={"Add new address receive"}
        footer={null}
        centered
        onCancel={() => setShowModal(false)}
        destroyOnClose={true}
        visible={showModal}>
        <ModalAddAddress
          onClose={getAddresses}
          onReload={() => setShowModal(false)}
        />
      </Modal>
    </div>
  )
}

export default AddressReceivePage