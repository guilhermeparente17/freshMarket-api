import { authMiddleware } from "../middlewares/authMiddleware.js";

export default async function (fastify) {
  fastify.get(
    "/admin/categories",
    { preHandler: [authMiddleware] },
    async (req, res) => {
      return await fastify.prisma.category.findMany();
    }
  );

  fastify.post(
    "/admin/categories",
    { preHandler: [authMiddleware] },
    async (req, res) => {
      const { name, description } = req.body;

      const category = await fastify.prisma.category.create({
        data: {
          name,
          description,
        },
      });

      return { message: `Categoria ${name} criada com sucesso!`, category };
    }
  );
}
