import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const app = Fastify();

    const PORT = process.env.PORT || 3000;

    await buildAdminRouter(app);
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Delivery app started on: http://localhost:${PORT}${admin.options.rootPath}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
