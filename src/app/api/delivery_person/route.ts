import { db } from "@/lib/db/db";
import { deliveryPerson, warehouse } from "@/lib/db/schema";
import { delivery_personSchema } from "@/lib/validators/delivery_personSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(requset:Request) {
    const requsetData = await requset.json();

    let validateData;
    try {
        validateData = await delivery_personSchema.parse(requsetData);
    } catch (err) {
        return Response.json({message:err},{status:400});
    }

    try {
        await db.insert(deliveryPerson).values(validateData);
        return Response.json({message:'OK'});
    } catch  {
        return Response.json({message:'Falied to store the delivery person into the database'},{status:500});
    }
}

export async function GET() {
    try {
        const allDeliveryperson = await db.select({
            id:deliveryPerson.id,
            name:deliveryPerson.name,
            phone:deliveryPerson.phone,
            warehouse: warehouse.name,
        }).from(deliveryPerson).leftJoin(warehouse,eq(deliveryPerson.warehouseId,warehouse.id)).orderBy(desc(deliveryPerson.id));
        return Response.json(allDeliveryperson);
    } catch {
        return Response.json({message:"Falied to fetch the data"},{status:500});
    }
}


