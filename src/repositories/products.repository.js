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
}
