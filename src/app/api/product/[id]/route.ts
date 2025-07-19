import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request, context: { params: { id: string } }) {
    const { id } = context.params;

    if (isNaN(Number(id))) {
        return new Response(JSON.stringify({ message: "Invalid product ID" }), { status: 400 });
    }

    try {
        const product = await db.select().from(products).where(eq(products.id, Number(id))).limit(1);

        if (product.length === 0) {
            return new Response(JSON.stringify({ message: "Product not found." }), { status: 404 });
        }

        return new Response(JSON.stringify(product[0]), { status: 200 });

    } catch {
        return new Response(JSON.stringify({ message: "Failed to fetch the product" }), { status: 500 });
    }
}
