import React from "react";
import { render } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";
import { Book } from "../../model/book.model";

const dummyBook: Book = {
    id: 1,
    title: 'Book Title',
    img: 5,
    category_id: 1,
    summary: 'Book Summary',
    author: 'Book Author',
    price: 10000,
    likes: 1,
    form: "paperback",
    isbn: "Dummy ISBN",
    detail: 'Book Detail',
    pages: 100,
    contents: 'Book Contents',
    pubDate: "2021-01-01"
};

describe("BookItem", () => {
    it ("렌더 여부", () => {
        const { getByText } = render(
            <BookStoreThemeProvider>
                <BookItem book={dummyBook} />
            </BookStoreThemeProvider>
        );
        expect(getByText(dummyBook.title)).toBeInTheDocument();
        expect(getByText(dummyBook.summary)).toBeInTheDocument();
        expect(getByText(dummyBook.author)).toBeInTheDocument();
        //expect(getByText(dummyBook.price)).toBeInTheDocument();
        
    });

});