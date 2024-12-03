import * as z from "zod";

export const editFormSchema = z.object({
  logo: z.instanceof(FileList).superRefine((files, ctx) => {
    if(!files.length) return z.NEVER;

    if (!files[0].type.startsWith("image/")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must provide an image.",
      });
      return z.NEVER;
    }

    if (files[0].size >= 1024 * 1024) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Image is too large."
      });
    }
  }),
  name: z.string().min(4, {
    message: "Name must be at least 4 characters long.",
  }),
});

export const createFormSchema = z.object({
  logo: z.instanceof(FileList).superRefine((files, ctx) => {
    if (!files.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide the logo.",
      });
      return z.NEVER;
    }

    if (!files[0].type.startsWith("image/")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must provide an image.",
      });
      return z.NEVER;
    }

    if (files[0].size >= 1024 * 1024) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Image is too large."
      });
    }
  }),
  name: z.string()
    .min(4, {
      message: "Name must be at least 4 characters long.",
    })
    .max(32, {
      message: "Name must be at most 32 characters long.",
    })
});