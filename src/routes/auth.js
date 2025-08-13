import { hashPassword, comparePassword } from "../utils/hash.js";
import bcrypt from "bcryptjs";

export default async function (fastify) {
  fastify.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await fastify.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { message: "Usuário criado com sucesso!", user };
  });

  fastify.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await fastify.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).send({ message: "Credenciais inválidas" });
    }

    const token = fastify.jwt.sign({ userId: user.id });
    return { message: "Login bem-sucedido", user, token };
  });

  fastify.post("/register-admin", async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await fastify.prisma.admin.create({
      data: { name, email, password: hashedPassword },
    });

    return { message: "Admin criado com sucesso!", admin };
  });

  fastify.post("/login-admin", async (req, res) => {
    const { email, password } = req.body;

    const admin = await fastify.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin || !(await comparePassword(password, admin.password))) {
      return res.status(401).send({ message: "Credenciais inválidas" });
    }

    const token = fastify.jwt.sign({ adminId: admin.id });
    return { message: "Login bem-sucedido", token };
  });
}
