import { z } from "zod";

export const schema = z.object({
  productId: z.number().min(1, "Ingrese un Id").max(20, 'Ingrese un Id entre 1 y 20'),
  quantity: z.number().min(1, "Ingrese una cantidad"),
})

export type FormValues = z.infer<typeof schema>;