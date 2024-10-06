import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";
import { registerRoutes } from "./src/routes/index.js";
import fastifySocketIO from "fastify-socket.io";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const app = Fastify();

    app.register(fastifySocketIO, {
      cors: {
        origin: "*",
      },
      pingInterval: 10000,
      pingTimeout: 5000,
      transports: ["websocket"],
    });

    const PORT = process.env.PORT || 3000;

    await registerRoutes(app);
    await buildAdminRouter(app);
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Delivery app started on: http://localhost:${PORT}${admin.options.rootPath}`);

    app.ready().then(() => {
      app.io.on("connection", (socket) => {
        console.log("A User Connected");

        socket.on("joinRoom", (orderId) => {
          socket.join(orderId);
          console.log(`User joined room ${orderId}`);
        });

        socket.on("disconnect", () => {
          console.log("User Disconnected");
        });
      });
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
