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

  fastify.put(
    "/admin/categories/:id",
    { preHandler: [authMiddleware] },
    async (req, res) => {
      const { name, description } = req.body;
      const { id } = req.params;

      const categorie = await fastify.prisma.category.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
        },
      });

      return {
        message: `Categoria ${name} atualizado com sucesso!`,
        categorie,
      };
    }
  );

  fastify.delete(
    "/admin/categories/:id",
    { preHandler: [authMiddleware] },
    async (req, res) => {
      const { id } = req.params;

      const categorie = await fastify.prisma.category.delete({
        where: { id: Number(id) },
      });

      return {
        message: `Categoria ${categorie.name} deletado com sucesso!`,
        categorie,
      };
    }
  );
}
