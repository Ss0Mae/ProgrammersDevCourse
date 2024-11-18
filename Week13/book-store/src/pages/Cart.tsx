import React from "react";
import { styled } from "styled-components";
import CartItem from "../components/cart/CartItem";
import Title from "../components/common/Title";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { carts } = useCart();
  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        <div className="content">
          {carts.map((cart) => (
            <CartItem key={cart.id} cart={cart} />
          ))}
        </div>
        <div className="summary"></div>
      </CartStyle>
    </>
  );
};

const CartStyle = styled.div``;
export default Cart;
