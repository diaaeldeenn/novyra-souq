export interface CategoryI {
  _id: string
  name: string
  slug: string
  image: string
}


export interface SubcategoryI {
  _id: string
  name: string
  slug: string
  category: string
}