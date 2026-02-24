import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name Is Required")
      .min(2, "Name Must Be Atleast 2 Char")
      .max(15, "Name Must Be Atmost 15"),

    email: z.email({ error: "Email Is Required" }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[#?!@$%^&*-]/,
        "Password must contain at least one special character",
      ),

    rePassword: z.string().nonempty("RePassword Is Required"),
    phone: z
      .string()
      .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "Password Must Match",
  });

export type registerTypeSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Email Is Required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[#?!@$%^&*-]/,
      "Password must contain at least one special character",
    ),
});

export type loginTypeSchema = z.infer<typeof loginSchema>;

export const resetPasswordSchema = z.object({
  email: z.email("Email Is Required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[#?!@$%^&*-]/,
      "Password must contain at least one special character",
    ),
});

export type resetPasswordTypeSchema = z.infer<typeof resetPasswordSchema>;

export const resetSchema = z.object({
  email: z.email("Email Is Required"),
});

export type resetTypeSchema = z.infer<typeof resetSchema>;

export const updateProfileSchema = z.object({
  name: z
    .string()
    .nonempty("Name Is Required")
    .min(2, "Name Must Be Atleast 2 Char")
    .max(15, "Name Must Be Atmost 15"),
  email: z.email({ error: "Email Is Required" }),
  phone: z
    .string()
    .nonempty("Phone Is Required")
    .regex(/^(?:\+|00)?[0-9]{7,15}$/, "Invalid Phone Number"),
});

export type updateProfileTypeSchema = z.infer<typeof updateProfileSchema>;

export const updateProfilePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Your Current Password Is Required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[#?!@$%^&*-]/,
        "Password must contain at least one special character",
      ),
    rePassword: z.string().nonempty("RePassword Is Required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "Password Must Match",
  });

export type updateProfilePasswordTypeSchema = z.infer<
  typeof updateProfilePasswordSchema
>;
