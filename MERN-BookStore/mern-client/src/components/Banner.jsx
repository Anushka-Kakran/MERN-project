import React from 'react'
import BannerCard from './BannerCard'

const Banner = () => {
  return (
      <div className='px-4 lg:px-24 bg-teal-100 flex items-center'> 
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
          {/* Left side */}
          <div className='md:w-1/2 space-y-8 h-full'>
            <h2 className='text-5xl font-bold leading-snug text-black'>Buy and sell Your Books<span className='text-blue-700'> for the Best Prices</span></h2>
            <p className='md:w-4/5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div>
              <input type='text' name='search' id='search' placeholder='Search a book' className='py-2 px-2 rounded-s-sm outline-none'/>
              <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>Search</button>
            </div>
          </div>

          {/* Right side */}
          <div><BannerCard/> </div>
        </div>
      </div>
  )
}

export default Banner
