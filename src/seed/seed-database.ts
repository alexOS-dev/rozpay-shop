import prisma from '../lib/prisma';
import { colors } from './seed-colors';
import { initialData } from './seed';
import { productConditions } from './seed-product-conditions';
import { provinces } from './seed-provinces';

async function main() {
  // 1. Borrar registros previos
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.color.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCondition.deleteMany();

  await prisma.user.deleteMany();
  await prisma.city.deleteMany();
  await prisma.province.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.color.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, users, brands } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  // Provincias
  await prisma.province.createMany({
    data: provinces,
  });

  // Marcas
  await prisma.brand.createMany({
    data: brands,
  });

  //  Categorias
  await prisma.category.createMany({
    data: categories,
  });

  // Colores
  await prisma.color.createMany({
    data: colors.map((color) => ({ ...color, name: color.name.toLowerCase() })),
  });

  const colorWhiteId = await prisma.color.findUnique({
    where: {
      name: 'blanco',
    },
    select: {
      id: true,
    },
  });

  if (!colorWhiteId) {
    throw new Error(
      'No se encontró el color "White". Verifica el nombre en la base de datos.'
    );
  }

  // Estados de productos (nuevo, usado, reacondicionado, outlet)
  await prisma.productCondition.createMany({
    data: productConditions,
  });

  const productConditionNewId = await prisma.productCondition.findUnique({
    where: {
      name: 'nuevo',
    },
    select: {
      id: true,
    },
  });

  if (!productConditionNewId) {
    throw new Error(
      'No se encontró el estado "nuevo". Verifica el nombre en la base de datos.'
    );
  }

  const allCategories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (!allCategories) {
    throw new Error(
      'No se encontró ninguna categoría. Verifica el nombre en la base de datos.'
    );
  }

  // Obtener id de la marca Apple para luego asignarla a los productos
  const allBrands = await prisma.brand.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (!allBrands) {
    throw new Error(
      'No se encontró ninguna marca. Verifica el nombre en la base de datos.'
    );
  }

  // Crear productos y guardar sus IDs
  const productIds: string[] = [];

  // Productos
  const productPromises = products.map(async (product) => {
    const { type, images, brand: productBrand, ...rest } = product;

    // Find the category ID based on the 'type' property
    const categoryId = allCategories.find(
      (category) => category.name === type
    )?.id;

    const brandId = allBrands.find((brand) => brand.name === productBrand)?.id;

    if (!categoryId) {
      throw new Error(`No se encontró la categoría para el tipo "${type}"`);
    }

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId,
        brandId,
        conditionId: productConditionNewId!.id,
        colorId: colorWhiteId.id,
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });

    productIds.push(dbProduct.id);
  });

  await Promise.all(productPromises);

  console.log('* Seed ejecutado exitosamente *');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
