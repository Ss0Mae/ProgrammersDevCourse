import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import AddToCart from '../components/book/AddToCart';
import LikeButton from '../components/book/LikeButton';
import Title from '../components/common/Title';
import { useBook } from '../hooks/useBook';
import { BookDetail as IBookDetail } from '../model/book.model';
import { formatDate, formatNumber } from '../utils/format';
import { getImgSrc } from '../utils/image';

const bookInfoList = [
  {
    label: "카테고리",
    key: "categoryName",
    filter: (book: IBookDetail) => 
      <Link to={`/books?category_id=${book.category_id}`}>
        {book.categoryName}
      </Link>
    
  },
  {
    label: "포맷",
    key: "form"
  },
  {
    label: "페이지",
    key: "pages"
  },
  {
    label: "ISBN",
    key: "isbn"
  },
  {
    label: "출간일",
    key: "pubDate",
    filter: (book: IBookDetail) => {
      return formatDate(book.pubDate);
    }
  },
  {
    label: "가격",
    key: "price",
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)}원`;
    }
  },
]

const BookDetail = () => {
  const { bookId } = useParams();
  const { book, likeToggle } = useBook(bookId);

  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map((info) => (
            <dl key={info.key}>
              <dt>{info.label}</dt>
              <dd>
                {info.filter
                  ? info.filter(book)
                  : book[info.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>
          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <AddToCart book = {book}/>
          </div>
        </div>
      </header>
      <div className="content"></div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  .header{
    display: flex;
    justify-content: start;
    gap:24px;
    padding : 0 0 24px 0;

    .img{
      flex : 1;
      img{
        width: 100%;
        height: auto;
      }
    }

    .info{
      flex : 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl{
        display: flex;
        margin: 0;
        dt{
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }
        a{
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }
`;
export default BookDetail
