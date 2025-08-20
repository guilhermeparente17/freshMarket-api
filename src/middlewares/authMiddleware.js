export async function authMiddleware(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ message: "Token inválido ou ausente" });
  }
}
