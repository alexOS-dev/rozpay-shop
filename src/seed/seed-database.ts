import prisma from '../lib/prisma';
import { chacoCities } from './seed-cities';
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
  await prisma.productImage.deleteMany(); // Mover esta eliminación antes de los productos
  await prisma.color.deleteMany(); // Si tienes una tabla intermedia para colores y productos
  await prisma.product.deleteMany(); // Primero eliminar productos
  await prisma.productCondition.deleteMany(); // Luego eliminar condiciones

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

  // Ciudades del Chaco
  await prisma.city.createMany({
    data: chacoCities,
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

  const categoriesDB = await prisma.category.findMany();
  console.log(categoriesDB);

  const smartphonesCategoryId = await prisma.category.findUnique({
    where: {
      name: 'smartphone',
    },
    select: {
      id: true,
    },
  });

  if (!smartphonesCategoryId) {
    throw new Error(
      'No se encontró la categoría "smartphone". Verifica el nombre en la base de datos.'
    );
  }

  // Obtener id de la marca Apple para luego asignarla a los productos
  const appleBrand = await prisma.brand.findUnique({
    where: {
      name: 'Apple',
    },
    select: {
      id: true,
    },
  });

  const appleId = appleBrand?.id;

  // Crear productos y guardar sus IDs
  const productIds: string[] = [];

  // Productos
  const productPromises = products.map(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: smartphonesCategoryId?.id,
        brandId: appleId,
        conditionId: productConditionNewId.id,
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
    // return dbProduct;
  });

  await Promise.all(productPromises);

  console.log('* Seed ejecutado exitosamente *');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
