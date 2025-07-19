import { api } from "./client";

export const getAllProduct = async()=>{
    const response = await api.get("/products");
    return response.data;
}       