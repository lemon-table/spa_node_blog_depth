export class ProductsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  createProduct = async (userId, title, content) => {
    const createProduct = await this.prisma.products.create({
      data: {
        UserId: userId,
        title,
        content,
      },
    });

    return createProduct;
  };

  readProducts = async (sort) => {
    const readProduct = await this.prisma.products.findMany({
      select: {
        productId: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: sort ? sort : "desc",
      },
    });
    return readProduct;
  };
}
