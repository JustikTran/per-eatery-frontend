import LoadingPage from '@/components/loading/loadingPage'
import React from 'react'

const DishPage = () => {
    return (
        <div className='p-5'>
            <LoadingPage message='Loading dishes...'/>
        </div>
    )
}

export default DishPage