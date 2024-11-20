import { OrderSheet } from "../model/order.model";
import { httpClient } from "./http";

export const order = async (orderDate: OrderSheet) => {
    const response = await httpClient.post("/orders", orderDate);
    return response.data;
}