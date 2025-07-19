import { db } from "@/lib/db/db";
import { inventories, products, warehouse } from "@/lib/db/schema";
import { inventoriesSchema } from "@/lib/validators/inventoriesSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request:Request) {
    const requestData = await request.json();

    let validateData;

    try {
        validateData = await inventoriesSchema.parse(requestData);
        
    } catch (error) {
        return Response.json({message:error},{status:400});
    }
    
    try {
        await db.insert(inventories).values(validateData);
        return Response.json({message:'OK'});
    } catch {
        return Response.json({message:"Failed to fetch the database"},{status:500})
    }

}

export async function GET() {
    try {
        const allinventories = await db.select({
            id:inventories.id,
            sku:inventories.sku,
            warehouse:warehouse.name,
            products:products.name,
        }
        ).from(inventories).leftJoin(warehouse,eq(inventories.warehouseId,warehouse.id))
        .leftJoin(products,eq(inventories.productID,products.id)).orderBy(desc(inventories.id));
        return Response.json(allinventories);
    } catch  {
        return Response.json({message:"Falied to fetch inventories"},{status :500})
    }
}