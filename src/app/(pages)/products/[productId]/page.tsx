import { ProductI } from "@/interfaces/product";
import { ProductIdType } from "@/interfaces/productId";
import { getSpecificProduct } from "@/services/products.services";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";
import { Star, Package, Truck, Shield } from "lucide-react";
import AddToCart from "../AddToCart";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import { authUserId } from "@/lib/nextAuth/authToken";
import ProductReviews from "@/components/reviews/ProductReviews";
import AddToWishlist from "../AddToWishlist";

export default async function ProductDetails({
  params,
}: {
  params: Promise<ProductIdType>;
}) {
  const { productId } = await params;
  const response = await getSpecificProduct(productId);

  if (!response?.data) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-muted-foreground mt-2">
          The product you're looking for doesn't exist.
        </p>
        <p className="text-sm text-gray-500 mt-4">ID: {productId}</p>
      </div>
    );
  }

  const product: ProductI = response.data;
  const currentUserId = await authUserId();
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="text-sm font-semibold">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="hover:text-primary transition-colors"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary">
                Product Details
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ProductImageCarousel
            images={product?.images}
            title={product.title}
          />
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-primary uppercase mb-2">
                {product?.brand?.name}
              </p>
              <h1 className="text-4xl font-black mb-3 leading-tight">
                {product?.title}
              </h1>
              <p className="text-sm text-muted-foreground font-semibold">
                {product?.category?.name}
              </p>
            </div>

            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((star, index) => {
                  const fieldStar = star < Math.floor(product?.ratingsAverage);
                  return (
                    <Fragment key={index}>
                      <Star
                        className={`size-5 ${
                          fieldStar
                            ? "text-[#C89B14] dark:text-[#F0C75E] fill-[#C89B14] dark:fill-[#F0C75E]"
                            : "text-muted fill-muted"
                        }`}
                      />
                    </Fragment>
                  );
                })}
              </div>
              <span className="text-lg font-bold">
                {product?.ratingsAverage}
              </span>
              <span className="text-muted-foreground">
                ({product?.ratingsQuantity} reviews)
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                DESCRIPTION
              </p>
              <p className="text-base leading-relaxed">
                {product?.description}
              </p>
            </div>

            <div className="flex items-baseline gap-3 py-6 border-y">
              <p className="text-5xl font-black text-[#C89B14] dark:text-[#F0C75E]">
                {product?.price}
                <span className="text-2xl ml-2">EGP</span>
              </p>
              {product?.sold > 5000 && (
                <span className="bg-[#DC3545] dark:bg-[#FF8A7F] text-white px-3 py-1 rounded-full text-sm font-bold">
                  TRENDING
                </span>
              )}
            </div>

            <div className="grid grid-cols-8 items-center gap-4">
              <div className="col-span-6">
                <AddToCart idProduct={product?._id} />
              </div>
              <div className="col-span-2">
                <AddToWishlist idProduct={product?._id} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-4 bg-muted rounded-xl">
                <Truck className="size-8 text-primary mb-2" />
                <p className="text-xs font-bold">Free Shipping</p>
                <p className="text-xs text-muted-foreground">
                  On orders over 500 EGP
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted rounded-xl">
                <Package className="size-8 text-primary mb-2" />
                <p className="text-xs font-bold">Easy Returns</p>
                <p className="text-xs text-muted-foreground">
                  30-day return policy
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted rounded-xl">
                <Shield className="size-8 text-primary mb-2" />
                <p className="text-xs font-bold">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16">
        <ProductReviews productId={productId} currentUserId={currentUserId} />
      </div>
    </main>
  );
}
