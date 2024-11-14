import { styled } from "styled-components";
import { Book } from "../../model/book.model";
import BookItem from "./BookItem";

interface Props {
    books : Book[];
}
function BooksList({books} : Props) {
    return (
        <BooksListStyle>
            {books.map(book => (
                <BookItem key={book.id} book={book} />
            ))}
        </BooksListStyle>
    )
}

const BooksListStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap : 24px;
    
`;

export default BooksList;