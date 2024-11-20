import { useEffect, useState } from "react";
import { fetchOrder, fetchOrders } from "../api/order.api";
import { Order, OrderListItem } from "../model/order.model";

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    useEffect(() => {
        fetchOrders().then((orders) => {
            setOrders(orders);
        })
    },[])

    const selectOrderItem = (orderId: number) => {

        if (orders.filter((item) => item.id === orderId)[0].detail) {
            setSelectedItemId(orderId);
            return;
        }
        fetchOrder(orderId).then((orderDetail) => {
            setSelectedItemId(orderId);
            setOrders(orders.map((order) => {
                if (order.id === orderId) {
                    return { ...order, detail: orderDetail };
                }
                return order;
            }));
        })
    }
    return { orders, selectOrderItem, selectedItemId };
}