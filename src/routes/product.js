import { authMiddleware } from "../middlewares/authMiddleware.js";

export default async function (fastify) {
  fastify.get(
    "/admin/products",
    { preHandler: [authMiddleware] },
    async (req, res) => {
      return fastify.prisma.product.findMany({
        include: {
          category: true,
        },
      });
    }
  );

  fastify.post(
    "/admin/products",
    { preHandler: [authMiddleware] },
    async (req, res) => {
      const {
        name,
        description,
        value,
        originalValue,
        stock,
        unit,
        origin,
        urlImage,
        categorieId,
      } = req.body;

      const product = await fastify.prisma.product.create({
        data: {
          name,
          description,
          value,
          originalValue,
          stock,
          unit,
          origin,
          urlImage,
          categorieId,
        },
      });

      return { message: `Produto ${name} criado com sucesso!`, product };
    }
  );

  fastify.put(
    "/admin/products/:id",
    { preHandler: [authMiddleware] },
    async (req, res) => {
      const {
        name,
        description,
        value,
        originalValue,
        stock,
        unit,
        origin,
        urlImage,
        categorieId,
      } = req.body;

      const { id } = req.params;

      const product = await fastify.prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          value,
          originalValue,
          stock,
          unit,
          origin,
          urlImage,
          categorieId,
        },
      });

      return { message: `Produto ${name} atualizado com sucesso!`, product };
    }
  );

  fastify.delete(
    "/admin/products/:id",
    { preHandler: [authMiddleware] },
    async (req, res) => {
      const { id } = req.params;
      try {
        const product = await fastify.prisma.product.delete({
          where: { id: Number(id) },
        });

        return {
          message: `Produto ${product.name} deletado com sucesso!`,
          product,
        };
      } catch (error) {
        if (error) {
          return res.status(404).send({ message: "Produto não encontrado" });
        }
        throw error;
      }
    }
  );
}
