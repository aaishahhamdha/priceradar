"use server";
import { connectToDatabase } from "../scraper/mongoose";
import { scrapeAmazon } from "../scraper";
import { revalidatePath } from "next/cache";
import { getAveragePrice ,getHighestPrice, getLowestPrice} from "../scraper/utils";
import Product from "../models/product.model";
import { Console } from "console";
export async function scrapeAndStoreProducts(url:string) {
    if (!url)return;
    try {
        connectToDatabase();
        const scrapedProduct= await scrapeAmazon(url);
        if(!scrapedProduct) return;
        let product=scrapedProduct;
        const existingProduct= await Product.findOne({url:scrapedProduct.url});

        if(existingProduct) {
            const updatedPriceHistory: any = [
              ...existingProduct.priceHistory,
              { price: scrapedProduct.currentPrice }
            ]
      
            product = {
              ...scrapedProduct,
              priceHistory: updatedPriceHistory,
              lowestPrice: getLowestPrice(updatedPriceHistory),
              highestPrice: getHighestPrice(updatedPriceHistory),
              averagePrice: getAveragePrice(updatedPriceHistory),
            }
          }

          const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true }
          );
      
          revalidatePath(`/products/${newProduct._id}`);
     

    } catch (error:any) {
         throw new Error('Failed to create/update Product: ${error.message}')
    }
}

export async function getProductByID(productID:string) {
    try {
        connectToDatabase();
        const product=await Product.findOne({_id:productID});
        if(!product)return null;
        return product;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllProducts() {
  try {
    connectToDatabase()
    const products=await Product.find()
    return products;

  } catch (error) {
    console.log(error)
  }
}


export async function getSimilarProducts(productId: string) {
  try {
    connectToDatabase();

    const currentProduct = await Product.findById(productId);

    if(!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}