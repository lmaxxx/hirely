import * as z from "zod";

export const signInFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
})

export type SignInFormValues = z.infer<typeof signInFormSchema>

export const signUpFormSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters long.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
})

export type SignUpFormValues = z.infer<typeof signUpFormSchema>