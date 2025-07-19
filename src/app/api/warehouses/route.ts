import { db } from "@/lib/db/db";
import { warehouse } from "@/lib/db/schema";
import { warehousesShema } from "@/lib/validators/warehoueseSchma";

export async function POST(request:Request) {
    //todo 
    const requestData = await request.json();

    let validateData;
    try {
        validateData = await warehousesShema.parse(requestData);
    } catch (error) {
        return Response.json({message: error},{status:400});
    }

    try {
        await db.insert(warehouse).values(validateData);

        return Response.json({message:'OK'},{status:201});
    } catch  {
        return Response.json({message:"Falied to store the warehouse"},{status:500});
    }
}


export async function GET() {
    try {
        const allwarehouse = await db.select().from(warehouse);
        return Response.json(allwarehouse);
    } catch  {
        return Response.json({message:'Fail to fetch the warehouse'},{status:500});
    }
    
};















