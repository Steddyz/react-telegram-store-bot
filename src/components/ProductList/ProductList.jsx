import React, { useCallback, useEffect, useState } from "react";

import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import useTelegram from "../hooks/useTelegram";

const products = [
  {
    id: "1",
    title: "Джинсы",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "2",
    title: "Куртка",
    price: 12000,
    description: "Зелёного цвета, тёплая",
  },
  {
    id: "3",
    title: "Джинсы 2",
    price: 35000,
    description: "Синего цвета, прямые",
  },
  {
    id: "4",
    title: "Куртка 2",
    price: 10000,
    description: "Зелёного цвета, тёплая",
  },
  {
    id: "5",
    title: "Джинсы 3",
    price: 200,
    description: "Синего цвета, прямые",
  },
  {
    id: "6",
    title: "Куртка 3",
    price: 15000,
    description: "Зелёного цвета, тёплая",
  },
  {
    id: "7",
    title: "Джинсы 4",
    price: 500,
    description: "Синего цвета, прямые",
  },
  {
    id: "8",
    title: "Куртка 4",
    price: 21000,
    description: "Зелёного цвета, тёплая",
  },
];

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

export default function ProductList() {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("https://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedItems, queryId]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({ text: `Купить ${getTotalPrice(newItems)}` });
    }
  };

  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={"item"} />
      ))}
    </div>
  );
}
