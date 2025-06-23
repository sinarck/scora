import { loginSchema } from "@/schema/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = loginSchema.parse(await request.json());

    console.log("username", username);
    console.log("password", password);

    return Response.json({
      username,
      password,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }
}

