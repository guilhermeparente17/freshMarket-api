import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySensible from "@fastify/sensible";
import fastify from "fastify";

import prismaPlugin from "./plugins/prisma.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import categorieRoutes from "./routes/categorie.js";
import productRoutes from "./routes/product.js";

export function buildApp() {
  const app = fastify({
    logger: true,
  });

  app.register(fastifyCors, {
    origin: "http://localhost:5173", // Permite todas as origens, ajuste conforme necessário
    credentials: true, // Permite cookies e cabeçalhos de autenticação
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.register(fastifySensible);
  app.register(fastifyJwt, {
    secret: "meu_segredo",
  });

  app.register(prismaPlugin);
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(categorieRoutes);
  app.register(productRoutes);

  return app;
}
