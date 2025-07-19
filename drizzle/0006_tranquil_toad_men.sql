CREATE TABLE "inventories" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"warehouse_id" integer,
	"Product_id" integer,
	"sku" varchar(8) NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_warehouse_id_warehouse_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouse"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_Product_id_products_id_fk" FOREIGN KEY ("Product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;