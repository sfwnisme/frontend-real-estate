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

export const UpdateUserSchema = CreateUserSchema.extend({
  password: CreateUserSchema.shape.password // reuse the original password schema
    .or(z.literal("")) // accept empty string as valid
    .optional()
    .transform((val) => (val === "" ? undefined : val)), // convert empty string to undefined
});

export type UpdateUserInputType = z.input<typeof UpdateUserSchema>; // form input type
export type UpdateUserType = z.infer<typeof UpdateUserSchema>; // output type after transform
