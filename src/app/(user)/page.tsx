import HomeBanner from '@/components/common/homeBanner'
import Location from '@/components/common/location'
import React from 'react'

const HomePage = () => {
  return (
    <div className='p-5'>
      <HomeBanner />
      <Location />
    </div>
  )
}

export default HomePage