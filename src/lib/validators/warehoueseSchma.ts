import { z } from "zod";

export const warehousesShema = z.object({
    name: z.string({message:"warehouse name should be a string"}),
    pincode: z.string({message:"warehoue pincode should be a string"}).length(6),
});