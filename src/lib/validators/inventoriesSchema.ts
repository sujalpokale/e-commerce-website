import { z } from "zod";

export const inventoriesSchema = z.object({
    sku: z.string({message:"SKU  should be a string"}).length(8,'Sku shoudle be 8 char'),
    warehouseId: z.number({message:"warehouse ID should be a Number"}),
    productID: z.number({message:"product ID should be a Number"}),
});