import React, { useState } from "react";
import { styled } from "styled-components";
import CartItem from "../components/cart/CartItem";
import Title from "../components/common/Title";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { carts, deleteCartItem } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const handleCheck = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleItemDelete = (id: number) => {
      deleteCartItem(id);
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        <div className="content">
          {carts.map((cart) => (
            <CartItem
              key={cart.id}
              cart={cart}
              checkedItems={checkedItems}
              onCheck={handleCheck}
              onDelete={handleItemDelete}
            />
          ))}
        </div>
        <div className="summary"></div>
      </CartStyle>
    </>
  );
};

const CartStyle = styled.div``;
export default Cart;
