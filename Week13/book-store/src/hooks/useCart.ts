import { useEffect, useState } from "react";
import { fetchCart } from "../api/carts.api";
import { Cart } from "../model/cart.model";

export const useCart = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    useEffect(() => {
        fetchCart().then((carts) => {
            setCarts(carts);
            setIsEmpty(carts.length === 0);
        });
    },[])
    return { carts, isEmpty };
}