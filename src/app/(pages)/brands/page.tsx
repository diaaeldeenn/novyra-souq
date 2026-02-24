import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandI } from "@/interfaces/brands";
import { getBrands } from "@/services/brands.services";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default async function Brands() {
  const { data } = await getBrands();
  const brands: BrandI[] = data || [];

  return (
    <main className="min-h-screen">
      <div className="bg-linear-to-br from-[#0D9D9A]/10 to-[#C89B14]/10 dark:from-[#5FD0CD]/10 dark:to-[#F0C75E]/10 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-4 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
            Our Brands
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover premium brands we offer with guaranteed quality and authenticity
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {brands.map((brand) => {
            return (
              <Fragment key={brand._id}>
                <Link href={`/brands/${brand._id}`}>
                  <Card className="group h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="relative w-full h-32 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                        <Image
                          width={200}
                          height={200}
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </CardHeader>

                    <CardContent className="pb-4 text-center">
                      <CardTitle className="text-lg font-bold group-hover:text-[#0D9D9A] dark:group-hover:text-[#5FD0CD] transition-colors">
                        {brand.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {brand.slug}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </main>
  );
}