import React from 'react'
import JewelryCard from '../Jewelry/JewelryCard'
export default function Favorites() {
  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
      <div className='flex flex-wrap justify-center '>
        {[1,1,1,1,1].map((item)=><JewelryCard/>)}
      </div>
    </div>
  )
}
