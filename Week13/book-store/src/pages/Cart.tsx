import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { styled } from "styled-components";
import CartItem from "../components/cart/CartItem";
import Empty from "../components/common/Empty";
import Title from "../components/common/Title";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { carts, deleteCartItem, isEmpty } = useCart();
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
        {!isEmpty && (
          <>
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
            <div className="summary">summary</div>
          </>
        )}
        {isEmpty && (
          <Empty
            title="장바구니가 비었습니다"
            icon={<FaShoppingCart />}
            description={<p>장바구니에 도서를 담아보세요.</p>}
          />
        )}
      </CartStyle>
    </>
  );
};

const CartStyle = styled.div``;
export default Cart;
