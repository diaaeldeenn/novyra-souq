import { ProductI } from "@/interfaces/product";
import { getAllProducts } from "@/services/products.services";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Star, Sparkles, TrendingUp } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import Link from "next/link";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";

export default async function Products() {
  const { data } = await getAllProducts();
  const products: ProductI[] = data || [];

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="fixed top-20 left-10 w-96 h-96 bg-[#0D9D9A]/10 dark:bg-[#5FD0CD]/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-[#C89B14]/10 dark:bg-[#F0C75E]/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>


      <div className="relative bg-linear-to-br from-[#0D9D9A]/10 via-background to-[#C89B14]/10 dark:from-[#5FD0CD]/10 dark:to-[#F0C75E]/10 py-20 mb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-linear-to-r from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-full border border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 backdrop-blur-sm">
            <Sparkles className="size-4 text-[#C89B14] dark:text-[#F0C75E] animate-pulse" />
            <span className="text-xs font-bold text-[#0D9D9A] dark:text-[#5FD0CD]">
              {products.length} PREMIUM PRODUCTS
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-linear-to-r from-[#0D9D9A] via-[#C89B14] to-[#0D9D9A] dark:from-[#5FD0CD] dark:via-[#F0C75E] dark:to-[#5FD0CD] bg-clip-text text-transparent drop-shadow-lg">
              Discover Amazing Products
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of premium products with exclusive deals and unbeatable quality
          </p>

          <div className="flex justify-center items-center gap-8 mt-12 flex-wrap">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-[#0D9D9A] dark:text-[#5FD0CD]" />
              <span className="text-sm font-bold">Top Brands</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2">
              <Star className="size-5 text-[#C89B14] dark:text-[#F0C75E] fill-[#C89B14] dark:fill-[#F0C75E]" />
              <span className="text-sm font-bold">Best Rated</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-[#0D9D9A] dark:text-[#5FD0CD]" />
              <span className="text-sm font-bold">Daily Deals</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            return (
              <Fragment key={product._id}>
                <Card className="group h-full flex flex-col bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-2xl hover:shadow-[#0D9D9A]/10 dark:hover:shadow-[#5FD0CD]/10 transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-[#0D9D9A]/30 dark:hover:border-[#5FD0CD]/30 overflow-hidden rounded-2xl">
                  
                  <div className="relative overflow-hidden bg-muted rounded-t-2xl">
                    <Link href={`/products/${product._id}`} className="block">
                      <div className="relative overflow-hidden aspect-square">
                        <Image
                          width={400}
                          height={400}
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </Link>
                    {product.sold > 2500 && (
                      <div className="absolute top-4 right-4 bg-linear-to-r from-[#DC3545] to-[#ff6b7a] dark:from-[#fc5344] dark:to-[#ff8a7f] text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg animate-pulse">
                        🔥 HOT
                      </div>
                    )}
                    <AddToWishlist idProduct={product._id} absolute/>
                  </div>
                  <CardHeader className="pb-3 lg:min-h-30 relative">
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-linear-to-r from-[#0D9D9A] to-[#087370] dark:from-[#5FD0CD] dark:to-[#3BB9B6] text-white rounded-full text-xs font-bold shadow-lg">
                      {product.brand.name}
                    </div>

                    <div className="mt-4">
                      <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-[#0D9D9A] dark:group-hover:text-[#5FD0CD] transition-colors duration-300 mb-2">
                        {product.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground uppercase tracking-wider">
                        {product.category.name}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 grow">
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex gap-0.5">
                        {[0, 1, 2, 3, 4].map((star, index) => {
                          const fieldStar = star < Math.floor(product.ratingsAverage);
                          return (
                            <Fragment key={index}>
                              <Star
                                className={`size-4 transition-all ${
                                  fieldStar
                                    ? "text-[#C89B14] dark:text-[#F0C75E] fill-[#C89B14] dark:fill-[#F0C75E] drop-shadow-sm"
                                    : "text-muted fill-muted"
                                }`}
                              />
                            </Fragment>
                          );
                        })}
                      </div>
                      <span className="text-sm font-bold ml-1 text-muted-foreground">
                        {product.ratingsAverage}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-black bg-linear-to-r from-[#C89B14] to-[#A67F10] dark:from-[#F0C75E] dark:to-[#E0B74E] bg-clip-text text-transparent">
                        {product.price}
                        <span className="text-base ml-1">EGP</span>
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <AddToCart idProduct={product._id} />
                  </CardFooter>
                </Card>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden bg-linear-to-r from-[#0D9D9A]/10 via-[#C89B14]/10 to-[#0D9D9A]/10 dark:from-[#5FD0CD]/10 dark:via-[#F0C75E]/10 dark:to-[#5FD0CD]/10 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl font-black mb-4 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Browse our categories or use the search to discover more amazing products
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/categories"
              className="px-8 py-3 bg-[#0D9D9A] dark:bg-[#5FD0CD] text-white rounded-xl font-bold hover:scale-105 hover:shadow-xl transition-all"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}