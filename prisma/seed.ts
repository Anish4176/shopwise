import "dotenv/config";
import { prisma } from "@/lib/prisma";

const main = async () => {
  try {
    const shirts = await prisma.category.upsert({
      create: {
        name: "T-shirts",
        slug: "t-shirts",
      },
      update: {},
      where: { slug: "t-shirts" },
    });

    const mugs = await prisma.category.upsert({
      create: {
        name: "Mugs",
        slug: "mugs",
      },
      update: {},
      where: { slug: "mugs" },
    });

    const products = [
      {
        name: "Classic Blue T-Shirt",
        slug: "classic-blue-t-shirt",
        description: "Soft cotton tee for everyday wear.",
        price: 49900, // ₹499 in paise
        stock: 25,
        categoryId: shirts.id,
      },
      {
        name: "Steel Travel Mug",
        slug: "steel-travel-mug",
        description: "Keeps drinks hot for hours.",
        price: 79900,
        stock: 40,
        categoryId: mugs.id,
      },
    ];

    for (const item of products) {
      await prisma.product.upsert({
        create: {
          ...item,
          images: [`https://picsum.photos/seed/${item.slug}/600/600`],
        },
        update: {},
        where: { slug: item.slug },
      });
    }
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

main();
