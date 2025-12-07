import { USER_ROLES } from "@/constants/enums";
import z from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(4, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  role: z.enum(USER_ROLES, { message: "Invalid role" }),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  role: z.enum(USER_ROLES, { message: "Invalid role" }),
});

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
