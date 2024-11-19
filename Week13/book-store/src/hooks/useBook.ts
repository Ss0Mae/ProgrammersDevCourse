import { useEffect, useState } from "react";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { addCart } from "../api/carts.api";
import { BookDetail } from "../model/book.model";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);  
    const [cartAdded, setCartAdded] = useState(false);
    const { isloggedIn } = useAuthStore();
    const { showAlert } = useAlert();
    const likeToggle = () => { 
        //권환 확인
        if (!isloggedIn) {
            showAlert("로그인이 필요합니다.");
            return;
        }
        if (!book) return;

        if (book.liked) {
            //like -> unlike
            unlikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1
                })
            })
        } else {
            //unlike -> like
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1
                })
            })
        }
    };


    const addToCart = (quantity: number) => {
        if (!book) return;
        
        addCart({
        book_id: book.id,
        quantity: quantity,
        }).then(() => {
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        });
     };
    
    useEffect(() => {
        if (!bookId) return;
        fetchBook(bookId).then((book) => {
            setBook(book);
        });
    }, [bookId]);
    return { book, likeToggle, addToCart, cartAdded };
};