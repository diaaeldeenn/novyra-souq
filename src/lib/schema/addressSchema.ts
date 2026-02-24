import * as z from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .nonempty("Name Is Required")
    .min(2, "Name Must Be Atleast 2 Char")
    .max(15, "Name Must Be Atmost 15"),
  details: z.string().nonempty("RePassword Is Required"),
  phone: z
    .string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z
    .string()
    .min(2, "Name Must Be Atleast 2 Char")
    .nonempty("City Is Required"),
});

export type addressTypeSchema = z.infer<typeof addressSchema>;

export const addressCheckoutSchema = z.object({
  details: z.string().min(1, "Details is required"),
  phone: z
    .string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(2, "City is required"),
});

export type AddressCheckoutTypeSchema = z.infer<typeof addressCheckoutSchema>;
