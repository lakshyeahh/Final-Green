import React from 'react'
import carbon from '../../Media/carbon.jpg'
import { Link } from 'react-router-dom'

function CarbonFootprint() {
    return (
        <section className="text-gray-600 body-font relative bg-green-100 -mt-8 mb-20  shadow-xl" style={{ backgroundImage: `url(${carbon})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '500px' }}>
         
            <div className="absolute inset-0  " style={{
                background: 'rgba(255, 255, 255, 0.2)',

                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                WebkitBackdropFilter: 'blur(8.9px)',
                backdropFilter: 'blur(8.9px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
            }}></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center lg:w-2/3 w-full z-10">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 tracking-wider">Measure Your Impact <span className='text-green-400'>Calculate Your CF</span></h1>
                    <p className="mb-8 leading-relaxed text-gray-600">Discover how your actions contribute to a sustainable future. Use our Carbon Footprint (CF) calculator to measure the environmental impact of your daily activities. Understanding your CF is the first step towards making informed decisions and reducing your carbon footprint. Join us in the journey towards a greener planet by calculating your CF today!</p>
                    <div className="flex justify-center mt-6">
                        <Link to='/login'>
                       
                        <button className="bg-transparent border border-solid border-white hover:bg-green-400 hover:text-gray-100 text-black font-bold py-2 px-4 rounded mr-2">Calculate Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CarbonFootprint