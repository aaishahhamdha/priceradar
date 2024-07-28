
import { getProductByID } from '@/lib/actions'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PriceCard from '@/components/PriceCard'
import { getSimilarProducts } from '@/lib/actions'
import ProductCard from '@/components/productCard'
import Modal from '@/components/modal'
type Props = {
  params: { id: string }
}



const ProductDetails = async ({ params: { id } }: Props) => {
  const product = await getProductByID(id);
  if (!product) redirect('/')

  const similarProducts = await getSimilarProducts(id);
  return (
    <div className='product-container'>
      <div className='flex gap-28 xl:flex-row flex-col'>
        <div className='product-image'>
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className='mx-auto'
          />
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
            <div className='flex flex-col gap-3'>
              <p className='text-[28px] text-secondary  font-semibold'>
                {product.title}
              </p>

              <Link href={product.url} target='_blank' className='text-base text-black opacity-50'>
                Visit Product
              </Link>
              <div className='flex item-center gap-3'>
                <div className='product-hearts'>
                  <Image
                    src='/assets/heart2.png' alt='heart' height={20} width={20} />
                  <p className="text-base font-semibold text-[#D46F77]">
                    {product.reviewsCount}
                  </p>

                </div>
                <div className='p-2 bg-white-200 rounded-10'>
                  <Image
                    src='/assets/bookmark.png' alt='bm' height={20} width={20} />
                </div>
                <div className='p-2 bg-white-200 rounded-10'>
                  <Image
                    src='/assets/share.png' alt='share' height={20} width={20} />
                </div>
              </div>
            </div>

            <div className='product-info'>
              <div className='flex flex-col gap-2'>
                <p className='text-[34px] text-secondary font-bold'>
                  {product.currency}{product.currentPrice}
                </p>

                <p className='text-[21px]text-black opacity-50 line-through'>
                  {product.currency}{product.originalPrice}
                </p>

              </div>

              <div className="flex flex-col gap-4">
                <div className='flex gap-3'>
                  <div className='product-stars'>
                    <Image
                      src='/assets/star.png' alt='share' height={16} width={16} />
                    <p className='text-sm text-primary-orange font-semibold'>
                      {product.stars || 25}
                    </p>
                  </div>
                  <div className='product-reviews'>
                    <Image src='/assets/rvw.png' alt='review' height={16} width={16} />
                    <p className='text-sm text-secondary font-semibold'>
                      {product.reviewsCount} Reviews
                    </p>
                  </div>

                </div>

                <p>
                  <span>2%
                  </span>of buyers have recommended this
                </p>
              </div>

              <div className='m-7 flex flex-col gap-5'>
                <div className='flex flex-wrap gap-5'>
                  <PriceCard
                    title="Current Price"
                    iconSrc="/assets/icons/price-tag.svg"
                    value={`${product.currency} ${product.currentPrice}`}
                  />
                  <PriceCard
                    title="Average Price"
                    iconSrc="/assets/icons/chart.svg"
                    value={`${product.currency} ${product.averagePrice}`}
                  />
                  <PriceCard
                    title="Highest Price"
                    iconSrc="/assets/icons/arrow-up.svg"
                    value={`${product.currency} ${product.highestPrice}`}
                  />
                  <PriceCard
                    title="Lowest Price"
                    iconSrc="/assets/icons/arrow-down.svg"
                    value={`${product.currency} ${product.lowestPrice}`}
                  />
                </div>

              </div>
              <Modal/>
            </div>
          </div>

          <div className="flex flex-col gap-16">

            <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
              <Image
                src="/assets/icons/bag.svg"
                alt="check"
                width={22}
                height={22}
              />

              <Link href="/" className="text-base text-white">
                Buy Now
              </Link>
            </button>
          </div>
          


        </div>
        
      </div>
      {similarProducts && similarProducts?.length > 0 && (
            <div className="py-14 flex flex-col gap-2 w-full">
              <p className="section-text">Similar Products</p>

              <div className="flex flex-wrap gap-10 mt-7 w-full">
                {similarProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
    </div>

  )
}

export default ProductDetails