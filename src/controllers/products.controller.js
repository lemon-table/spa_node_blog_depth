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

  /** 상품 조회 API */
  readProducts = async (req, res, next) => {
    try {
      const { sort } = req.query;
      const products = await this.productsService.readProducts(sort);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "상품 목록이 조회되었습니다.",
        data: products,
      });
    } catch (err) {
      next(err);
    }
  };

  /** 상품 상세 조회 API */
  readDetProduct = async (req, res, next) => {
    try {
      const { Id } = req.params;
      const product = await this.productsService.readDetProduct(Id);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "상품 상세정보가 조회되었습니다.",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  };
}
