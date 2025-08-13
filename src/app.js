import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySensible from "@fastify/sensible";
import fastify from "fastify";

import prismaPlugin from "./plugins/prisma.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

export function buildApp() {
  const app = fastify({
    logger: true,
  });

  app.register(fastifyCors);
  app.register(fastifySensible);
  app.register(fastifyJwt, {
    secret: "meu_segredo",
  });

  app.register(prismaPlugin);
  app.register(authRoutes);
  app.register(userRoutes);

  return app;
}
