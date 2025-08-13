import { authMiddleware } from "../middlewares/authMiddleware.js";

export default async function (fastify) {
  fastify.get(
    "/auth/me",
    { preHandler: [authMiddleware] },
    async (req, res) => {
      const userId = req.user.userId;
      return await fastify.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true },
      });
    }
  );
}
