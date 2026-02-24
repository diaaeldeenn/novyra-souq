export interface ReviewsRootI {
  results: number
  metadata: Metadata
  data: ReviewsI[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface ReviewsI {
  _id: string
  review: string
  rating: number
  product: string
  user: UserReviewsI
  createdAt: string
  updatedAt: string
}

export interface UserReviewsI {
  _id: string
  name: string
}



export interface ProductReviewsProps {
  productId: string;
  currentUserId?: string;
}