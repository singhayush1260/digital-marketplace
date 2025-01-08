import { prisma } from "@/app/lib/db";
import { notFound } from "next/navigation";
import { type CategoryTypes } from "@prisma/client";
import ProductCard from "@/app/components/product-card";
import {unstable_noStore as noStore} from "next/cache";
const getData = async (category: string) => {
  let input;

  switch (category) {
    case "template": {
      input = "template";
      break;
    }
    case "uikit": {
      input = "uikit";
      break;
    }
    case "icon": {
      input = "icon";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      images: true,
      smallDescription: true,
      name: true,
      price: true,
    },
  });

  return data;
};
type paramsType = Promise<{ category: string }>;
const ProductCategoryPage = async ({
  params,
}: {
  params:paramsType;
}) => {
  noStore();
  const {category}=await params;
  const data = await getData(category);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            images={product.images}
            price={product.price}
            name={product.name}
            id={product.id}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </section>
  );
};
export default ProductCategoryPage;
