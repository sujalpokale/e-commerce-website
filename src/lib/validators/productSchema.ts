import { z } from "zod";

export const productShema = z.object({
    name : z.string({message:"Products name should be a string"}),
    image: z.instanceof(File,{message:"Products image should be a image"}),
    description: z.string({message:"Product descripation should be a string"}),
    price : z.number({message:"Product price should be a number"}), 
});