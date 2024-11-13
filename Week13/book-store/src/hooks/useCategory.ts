import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";

export const useCategory = () => {
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        fetchCategory().then((category) => {
            if(!category) return;
            const categoryWithAll = [
                {
                    id: null,
                    name : '전체'
                },
                ...category
            ]
            setCategory(categoryWithAll);
        });
    }, [])
    return { category };
}