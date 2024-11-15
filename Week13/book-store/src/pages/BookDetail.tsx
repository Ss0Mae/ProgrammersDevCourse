import React from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { useBook } from '../hooks/useBook';

const BookDetail = () => {
  const { bookId } = useParams();
  const { book } = useBook(bookId);

  if (!book) return null;
  return (
    <BookDetailStyle>
     {bookId}
    </BookDetailStyle>
  )
}

const BookDetailStyle = styled.div`

`;
export default BookDetail
