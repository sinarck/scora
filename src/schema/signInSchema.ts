import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().regex(/^\d{6}$/, "Student ID must be exactly 6 digits"),
  password: z.string().min(1, "Password is required"),
  district: z.string().min(1, "Please select your school district"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
