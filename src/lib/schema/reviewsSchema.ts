import * as z from "zod";
export const reviewsSchema = z
  .object({
    review: z.string().nonempty("You Must Add Review").min(3, "Review Must Be Atleast 3 Char"),
    rating: z.number().min(0).max(5)
  })



  export type reviewsTypeSchema = z.infer<typeof reviewsSchema>;