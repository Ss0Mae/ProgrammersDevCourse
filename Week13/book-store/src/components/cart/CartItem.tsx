import React from 'react'
import { styled } from 'styled-components'
import { Cart } from '../../model/cart.model'
import { formatNumber } from '../../utils/format';
import Button from '../common/Button';
import Title from '../common/Title';
import CheckIconButton from './CheckIconButton';

interface Props{
    cart: Cart;
}
const CartItem = ({cart} : Props) => {
  return (
    <CartItemStyle>
      <div className="info">
        <CheckIconButton/>
        <div>
          <Title size="medium" color="text">
            {cart.title}
          </Title>
          <p className="summary">{cart.summary}</p>
          <p className="price">{formatNumber(cart.price)}원</p>
          <p className="quantity">{cart.quantity}권</p>
        </div>
      </div>
      <Button size="medium" scheme="normal">
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
}

const CartItemStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    border : 1px solid ${({ theme }) => theme.color.border};
    border-radius : ${({ theme }) => theme.borderRadius.default};
    padding : 12px;

    p{
        padding : 0 0 8px 0;
        margin : 0;
    }
`;
export default CartItem
