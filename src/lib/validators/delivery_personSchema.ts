import { z } from "zod";

export const delivery_personSchema = z.object({
    name: z.string({message:"Delivery person name should be a string"}),
    phone: z.string({message:"Delivery person Phone should be a String"}).length(13,'Delivery person phone should be 13 char long'),
    warehouseId: z.number({message:"warehouse ID should be a Number"}),
});