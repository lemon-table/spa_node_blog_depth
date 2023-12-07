export class ProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  createProduct = async (userId, title, content) => {
    // 사용자ID 체크
    if (!userId) throw new Error("USER_ID_NOT_FOUND_ERROR");
    // 글제목 체크
    if (!title) throw new Error("TITLE_NOT_FOUND_ERROR");
    // 글내용 체크
    if (!content) throw new Error("CONTENT_NOT_FOUND_ERROR");

    const product = await this.productsRepository.createProduct(
      userId,
      title,
      content
    );

    return {
      status: product.status,
      productId: product.productId,
      userId: product.UserId,
      title: product.title,
      content: product.content,
      createdAt: product.createdAt,
    };
  };

  readProducts = async (sort) => {
    const sortStr = sort ? sort.toLowerCase() : null;

    if (sortStr !== null && sortStr !== "desc" && sortStr !== "asc") {
      throw new Error("INVALID_SORT_ERROR");
    }
    const products = await this.productsRepository.readProducts(sortStr);

    return {
      products,
    };
  };
}
