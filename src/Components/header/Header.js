import React from "react";
import { useSelector } from "react-redux";
import "./header.css";
export default function Header() {
  const { items } = useSelector((state) => state.items);
  const income = items.filter((item) => item.type === "income");
  return (
    <div className="header">
      <div className="header__title">
        <h1>Budget Tracker</h1>
      </div>
      <div className="header__balance">
        ${" "}
        {income.length &&
          income.map((item) => item.price).reduce((acc, curr) => +acc + +curr)}
      </div>
    </div>
  );
}
