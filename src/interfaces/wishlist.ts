import { BrandI } from "./brands"
import { CategoryI, SubcategoryI } from "./categories"


export interface WishlistI {
  status: string
  count: number
  data: WishlistCartI[]
}




export interface WishlistCartI {
  sold: number
  images: string[]
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}