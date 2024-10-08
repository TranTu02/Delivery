import mongoose from "mongoose";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true, // Chỉ nên sử dụng trong môi trường phát triển
};

// Hàm kết nối MongoDB
export const connectDB = async (uri) => {
  try {
    // Kết nối MongoDB với các tùy chọn bổ sung
    await mongoose.connect(uri, options);
    console.log("Database connected successfully");
  } catch (error) {
    // In thông báo lỗi và throw error để xử lý ở mức cao hơn
    console.error("Database connection error:", error);
    throw error; // Ném lỗi ra ngoài để ứng dụng chính (app.js) có thể xử lý
  }
};
