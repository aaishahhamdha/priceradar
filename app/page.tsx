import React from 'react'
import SearchBar from '@/components/SearchBar'
import HeroSlider from '@/components/HeroSlider'
import Image from "next/image";
import { getAllProducts } from '@/lib/actions';
import ProductCard from '@/components/productCard';

const Home =async () => {

  const allProducts=await getAllProducts()
  return (
    <>
    <section className='px-6 md:px-20 py 24'>
      <div className='flex max-xl:flexcol gap-16'>
        <div className='flex flex-col justify-center'>
        <p className='small-text'>
            Smart shopping starts here
            <Image src='/assets/search.png'  alt='arrow' width={16} height={16}/>
            </p>
            <h1 className='head-text'>
             Unleash the power of <span className='text-primary'>PriceRadar</span>
            </h1>
            <p className='mt-6'>
            Powerful, self-serve product and growth analytics to help you convert, engage, and retain more
            </p>
            <SearchBar/>
        </div>
        <HeroSlider/>
      </div>
     
      </section>

      <section className='trending-section'>
        <h2 className='section-text'>
          Trending
        </h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {
            allProducts?.map((product)=>(
              <ProductCard key={product._id} product={product}/>))
          }

        </div>

      </section>
    </>
  )
}

export default Home