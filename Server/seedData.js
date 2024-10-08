import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Sử dụng dotenv để tải các biến môi trường

export const categories = [
  { name: "Electronics", image: "https://example.com/electronics.jpg" },
  { name: "Books", image: "https://example.com/books.jpg" },
  { name: "Furniture", image: "https://example.com/furniture.jpg" },
];
export const products = [
  {
    name: "Smartphone",
    image: "https://example.com/smartphone.jpg",
    price: 499.99,
    discountPrice: 399.99,
    quantity: "20",
    category: "", // Sẽ cập nhật sau khi chèn Category
  },
  {
    name: "Bookshelf",
    image: "https://example.com/bookshelf.jpg",
    price: 99.99,
    discountPrice: 79.99,
    quantity: "15",
    category: "", // Sẽ cập nhật sau khi chèn Category
  },
  {
    name: "Laptop",
    image: "https://example.com/laptop.jpg",
    price: 999.99,
    discountPrice: 849.99,
    quantity: "10",
    category: "", // Sẽ cập nhật sau khi chèn Category
  },
];
