import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productShema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import {  writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request){
    ///todo check 
    const data = await request.formData();

    let vaildatedData;
    try{
        vaildatedData = productShema.parse({
            name : String(data.get('name')),
            description: data.get('description'),
            price: Number(data.get('price')),
            image: data.get('image'),
        });

    } catch (err) {
            return Response.json({message: err},{status:400});
    }

    const filename = `${Date.now()}.${vaildatedData.image.name.split('.').slice(-1)}`;

    try {
        
        const buffer = Buffer.from(await vaildatedData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(),'public/assets',filename), buffer);
    } catch {
        return Response.json({message:"Failed to save the file to fs"},{status:500});
    }

    try {
            await db.insert(products).values({...vaildatedData, image: filename});

    } catch  {
        return Response.json(
            {message:'Failed to store product into the database '},
            {status:500}
        );
    }

    return Response.json({message:"ok"},{status:201});

}

export async function GET() {
        try {
            const allProducts = await db.select().from(products).orderBy(desc(products.id));
            return Response.json(allProducts);
        } catch {
            return Response.json({message:'Failed to fetch product'},{status:500});
        }
    
}