import React from "react";

import "./ProductItem.css";
import Button from "../Button/Button";

export default function ProductItem({ product, className, onAdd }) {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <div className={"product" + className}>
      <div className={"img"} />
      <div className={"title"}>{product.title}</div>
      <div className={"description"}>{product.desciption}</div>
      <div className={"price"}>
        <span>
          Стоимость: <b>{product.price}</b>
        </span>
      </div>
      <Button className={"add-btn"} onClick={onAddHandler}>
        Добавить в корзину
      </Button>
    </div>
  );
}
