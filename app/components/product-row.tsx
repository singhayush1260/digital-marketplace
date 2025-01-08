import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "../lib/db";
import { notFound } from "next/navigation";
import ProductCard, { LoadingProductCard } from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";
interface iAppProps {
    category: "newest" | "templates" | "uikits" | "icons";
  }
  
  async function getData({ category }: iAppProps) {
    switch (category) {
      case "icons": {
        const data = await prisma.product.findMany({
          where: {
            category: "icon",
          },
          select: {
            price: true,
            name: true,
            smallDescription: true,
            id: true,
            images: true,
          },
          take: 3,
        });
  
        return {
          data: data,
          title: "Icons",
          link: "/products/icon",
        };
      }
      case "newest": {
        const data = await prisma.product.findMany({
          select: {
            price: true,
            name: true,
            smallDescription: true,
            id: true,
            images: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 3,
        });
  
        return {
          data: data,
          title: "Newest Products",
          link: "/products/all",
        };
      }
      case "templates": {
        const data = await prisma.product.findMany({
          where: {
            category: "template",
          },
          select: {
            id: true,
            name: true,
            price: true,
            smallDescription: true,
            images: true,
          },
          take: 3,
        });
  
        return {
          title: "Templates",
          data: data,
          link: "/products/template",
        };
      }
      case "uikits": {
        const data = await prisma.product.findMany({
          where: {
            category: "uikit",
          },
          select: {
            id: true,
            name: true,
            price: true,
            smallDescription: true,
            images: true,
          },
          take: 3,
        });
  
        return {
          title: "Ui Kits",
          data: data,
          link: "/products/uikit",
        };
      }
      default: {
        return notFound();
      }
    }
  }
  export const ProductRow=({ category }: iAppProps)=> {
    return (
      <section className="mt-12">
        <Suspense fallback={<LoadingState />}>
            {/* @ts-expect-error  Server Components*/}
          <LoadRows category={category} />
        </Suspense>
      </section>
    );
  }

export const LoadRows=async({ category }: iAppProps)=>{
    const data = await getData({ category: category });
return(
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
         {data.title}
        </h2>
        <Link
          href={data.link}
          className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-10">
        {data.data.map((product) => (
          <ProductCard
            images={product.images}
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </section>
)
}
const LoadingState=()=> {
    return (
      <div>
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
        </div>
      </div>
    );
  }