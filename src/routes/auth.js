export default async function (fastify) {
  fastify.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const user = await fastify.prisma.user.create({
      data: { name, email, password },
    });

    return { message: "Usuário criado com sucesso!", user };
  });

  fastify.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await fastify.prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).send({ message: "Credenciais inválidas" });
    }

    const token = fastify.jwt.sign({ userId: user.id });
    return { message: "Login bem-sucedido", user, token };
  });

  fastify.post("/register-admin", async (req, res) => {
    const { name, email, password } = req.body;

    const admin = await fastify.prisma.admin.create({
      data: { name, email, password },
    });

    return { message: "Admin criado com sucesso!", admin };
  });

  fastify.post("/login-admin", async (req, res) => {
    const { email, password } = req.body;

    const admin = await fastify.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin || admin.password !== password) {
      return res.status(401).send({ message: "Credenciais inválidas" });
    }

    const token = fastify.jwt.sign({ adminId: admin.id });
    return { message: "Login bem-sucedido", token };
  });
}
