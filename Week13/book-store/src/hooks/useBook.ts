import { useEffect, useState } from "react";
import { fetchBook } from "../api/books.api";
import { BookDetail } from "../model/book.model";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);  
    
    useEffect(() => {
        if (!bookId) return;
        fetchBook(bookId).then((book) => {
            setBook(book);
        });
    }, [bookId]);
    return { book };
};