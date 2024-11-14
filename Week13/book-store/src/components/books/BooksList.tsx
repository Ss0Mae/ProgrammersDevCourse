import { styled } from "styled-components";
import { Book } from "../../model/book.model";
import BookItem from "./BookItem";

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
    pubDate : "2021-01-01"
}
function BooksList() {
    return (
        <BooksListStyle>
            <BookItem book={dummyBook} />
        </BooksListStyle>
    )
}

const BooksListStyle = styled.div``;

export default BooksList;