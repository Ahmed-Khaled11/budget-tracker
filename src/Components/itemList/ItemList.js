import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItems } from "../../redux/itemSlice";

import "./itemList.css";
export default function ItemList() {
  let { item } = useSelector((state) => state.item)
  // let item = item;
  let dispatch = useDispatch()
  const handleDelete = (hh) => {
    item = item.filter((w) => w.title !== hh);
    dispatch(updateItems(item));
    localStorage.setItem("itemList", JSON.stringify(item));
  }
    return (
      <div className="itemList container">
        <div className="list">
          Item List :
          {item.length ? (
            item.map((item, index) => (
              <div className="items " key={index}>
                <p className="item-price">{index + 1}-</p>
                <span className="title">{item.title}</span>
                <span className="price"> $ {item.price}</span>
                <span className="date">{item.date}</span>
                <span
                  style={{ color: item.type === "income" ? "green" : "red" }}
                  className="type"
                >
                  {item.type}
                </span>
                <button onClick={() => handleDelete(item.title)}>Del</button>
              </div>
            ))
          ) : (
            <span className="empty-data"> "No Items To Show !"</span>
          )}
        </div>
      </div>
    );
      }
      