import React from 'react'
import { FaHeart } from 'react-icons/fa';
import { styled } from 'styled-components'
import { BookDetail } from '../../model/book.model'
import Button from '../common/Button';

interface Props {
    book: BookDetail;
    onClick: () => void;
}
function LikeButton ({book,onClick} : Props) {
    return (
        <LikeButtonStyled size="medium" scheme={book.liked ? 'like' : 'normal'}
        onClick = {onClick}>
        <FaHeart />
        {book.likes}
      </LikeButtonStyled>
    );
}

const LikeButtonStyled = styled(Button)`
    display : flex;
    gap : 6px;

    svg{
        color : inherit;
        *{
            color : inherit;
        }
    }
`;
export default LikeButton
