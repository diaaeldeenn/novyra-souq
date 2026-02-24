import { CategoryI } from "@/interfaces/categories";
import { getCategories } from "@/services/categories.services";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default async function Categories() {
  const { data } = await getCategories();
  const categories: CategoryI[] = data || [];
  return (
    <main className="min-h-screen bg-linear-to-b from-background via-[#0D9D9A]/5 to-background dark:via-[#5FD0CD]/5">
      <div className="relative overflow-hidden py-20 mb-16">
        <div className="absolute inset-0 bg-linear-to-r from-[#0D9D9A]/20 via-[#C89B14]/20 to-[#0D9D9A]/20 dark:from-[#5FD0CD]/20 dark:via-[#F0C75E]/20 dark:to-[#5FD0CD]/20 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(13,157,154,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(95,208,205,0.1),transparent)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-[#0D9D9A]/10 dark:bg-[#5FD0CD]/10 rounded-full border border-[#0D9D9A]/20 dark:border-[#5FD0CD]/20">
            <span className="text-sm font-bold bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
              EXPLORE OUR COLLECTION
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-linear-to-r from-[#0D9D9A] via-[#C89B14] to-[#0D9D9A] dark:from-[#5FD0CD] dark:via-[#F0C75E] dark:to-[#5FD0CD] bg-clip-text text-transparent">
            Shop by Category
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Browse through our carefully curated categories and find exactly what you're looking for
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            return (
              <Fragment key={category._id}>
                <Link href={`/categories/${category.slug}`}>
                  <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-br from-[#0D9D9A]/90 via-[#0D9D9A]/70 to-[#C89B14]/90 dark:from-[#5FD0CD]/90 dark:via-[#5FD0CD]/70 dark:to-[#F0C75E]/90 opacity-90 group-hover:opacity-95 transition-all duration-500"></div>
                    
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500">
                      <Image
                        width={400}
                        height={400}
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                    <div className="relative h-full flex flex-col justify-between p-8">
                      <div className="flex justify-end">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <div className="mb-3 inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                          <span className="text-xs font-bold text-white/90">
                            {category.slug}
                          </span>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                          {category.name}
                        </h2>
                        <div className="w-16 h-1 bg-white/60 rounded-full group-hover:w-24 transition-all duration-300"></div>
                      </div>
                    </div>

                    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-all duration-300"></div>
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-16 translate-y-16"></div>
                    </div>
                  </div>
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </main>
  );
}