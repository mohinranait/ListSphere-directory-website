
import z from "zod";

// Register schema
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(20, "Full name must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
});


// login schema 
export const loginSchema = z.object({
    email: z.string().email("Provide valid email"),
    password: z.string().nonempty("Password field is required")
})