import {z} from "zod";

export const createApplicationFormSchema = z.object({
  position: z.string()
    .min(4, {
      message: "Position must be at least 4 characters long.",
    }).max(32, {
      message: "Position must be at most 32 characters long.",
    }),
  company: z.string().min(1, {
    message: "Select a company for new application.",
  })
});

export type CreateApplicationFormValues = z.infer<typeof createApplicationFormSchema>;