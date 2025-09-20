import { Carousel } from 'antd'
import Image from 'next/image'
import React from 'react'

const HomeBanner = () => {
    return (
        <Carousel arrows infinite={false} autoplaySpeed={5000} autoplay={true}        >
            <div className='w-full h-[350px] flex justify-center bg-slate-200 rounded-lg'>
                <Image width={600}
                    height={320}
                    className="mx-auto"
                    src={'/images/PHO-BAP-BO-1.png'} alt='' />
            </div>
            <div className='w-full h-[350px] flex justify-center bg-slate-200 rounded-lg'>
                <Image width={600}
                    height={320}
                    className="mx-auto"
                    src={'/images/maxresdefault.jpg'} alt='' />
            </div>
            <div className='w-full h-[350px] flex justify-center bg-slate-200 rounded-lg'>
                <Image width={600}
                    height={320}
                    className="mx-auto"
                    src={'/images/bun-bo-hue.png'} alt='' />
            </div>
        </Carousel>
    )
}

export default HomeBanner