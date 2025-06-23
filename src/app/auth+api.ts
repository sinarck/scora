import { loginSchema } from "@/schema/auth";

export function POST(request: Request) {
  const { username, password } = loginSchema.parse(request.body);
  console.log(username, password);

  return Response.json({ username, password });
}
