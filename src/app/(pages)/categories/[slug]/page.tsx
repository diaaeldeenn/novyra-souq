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
import { Star } from "lucide-react";
import { Fragment } from "react";
import Link from "next/link";
import AddToWishlist from "../../products/AddToWishlist";
import AddToCart from "../../products/AddToCart";

export default async function CategoryProducts({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await getAllProducts();
  const allProducts: ProductI[] = data || [];
  

  const products = allProducts.filter(
    (product) => product.category.slug === slug
  );

  return (
    <main className="min-h-screen">
      <div className="bg-linear-to-br from-[#0D9D9A]/10 to-[#C89B14]/10 dark:from-[#5FD0CD]/10 dark:to-[#F0C75E]/10 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-4 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent capitalize">
            {slug.replace(/-/g, ' ')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {products.length} products found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              return (
                <Fragment key={product._id}>
                  <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden">
                    <div className="relative overflow-hidden bg-muted">
                      <Link href={`/products/${product._id}`} className="group">
                        <Image
                          width={400}
                          height={400}
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>
                      {product.sold > 2500 && (
                        <div className="absolute top-3 right-3 bg-[#DC3545] dark:bg-[#fc5344] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          HOT
                        </div>
                      )}
                      <AddToWishlist absolute idProduct={product._id}/>
                    </div>

                    <CardHeader className="pb-3 lg:min-h-30">
                      <CardDescription className="text-xs font-semibold text-muted-foreground uppercase">
                        {product.brand.name}
                      </CardDescription>
                      <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        {product.category.name}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-3 grow">
                      <div className="flex items-center gap-1 mb-3">
                        {[0, 1, 2, 3, 4].map((star, index) => {
                          const fieldStar =
                            star < Math.floor(product.ratingsAverage);
                          return (
                            <Fragment key={index}>
                              <Star
                                className={`size-4 ${
                                  fieldStar
                                    ? "text-[#C89B14] dark:text-[#F0C75E] fill-[#C89B14] dark:fill-[#F0C75E]"
                                    : "text-muted fill-muted"
                                }`}
                              />
                            </Fragment>
                          );
                        })}
                        <span className="text-sm font-bold ml-1 text-muted-foreground">
                          {product.ratingsAverage}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-black text-[#C89B14] dark:text-[#F0C75E]">
                          {product.price}
                          <span className="text-sm ml-1">EGP</span>
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <AddToCart idProduct={product._id} />
                    </CardFooter>
                  </Card>
                </Fragment>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-muted-foreground mb-4">
              No products found in this category
            </h2>
            <Link href="/products">
              <button className="px-6 py-3 bg-[#0D9D9A] dark:bg-[#5FD0CD] text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
                Browse All Products
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}