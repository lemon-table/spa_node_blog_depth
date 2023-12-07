import { StatusCodes } from "../constants/statusCodes.constant.js";

export class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }
  /** 상품 등록 API */
  createProduct = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, content } = req.body;

      const product = await this.productsService.createProduct(
        userId,
        title,
        content
      );

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "상품 등록 되었습니다.",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  };
}
