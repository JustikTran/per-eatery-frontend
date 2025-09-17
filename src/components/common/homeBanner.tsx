import { Carousel } from 'antd'
import React from 'react'

const HomeBanner = () => {
    return (
        <Carousel arrows infinite={false} autoplaySpeed={5000} autoplay={true}>
            <div>
                <h3 style={{ lineHeight: '20rem' }} className='h-80 text-white text-center bg-cyan-900' >1</h3>
            </div>
            <div>
                <h3 style={{ lineHeight: '20rem' }} className='h-80 text-white text-center bg-cyan-900'>2</h3>
            </div>
            <div>
                <h3 style={{ lineHeight: '20rem' }} className='h-80 text-white text-center bg-cyan-900'>3</h3>
            </div>
            <div>
                <h3 style={{ lineHeight: '20rem' }} className='h-80 text-white text-center bg-cyan-900'>4</h3>
            </div>
        </Carousel>
    )
}

export default HomeBanner