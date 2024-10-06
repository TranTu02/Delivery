import { getAllCategories } from "../controllers/product/category.js";
import { getAllProductsByCategoryId } from "../controllers/product/product.js";

export const categoryRoutes = async (fastify, options) => {
  fastify.get("/categories", getAllCategories);
};

export const productRotes = async (fastify, options) => {
  fastify.get("/products/:categoryId", getAllProductsByCategoryId);
};
