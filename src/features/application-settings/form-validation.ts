import {z} from "zod";

export const editApplicationSettings = z.object({
  position: z.string()
    .min(4, {
      message: "Position must be at least 4 characters long.",
    }).max(32, {
      message: "Position must be at most 32 characters long.",
    }),
});

export type EditApplicationSettingsValues = z.infer<typeof editApplicationSettings>;