import React, { useRef } from "react";
import "./input.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/itemSlice";
export default function Input() {
  const title = useRef();
  const price = useRef();
  const date = useRef();
  const type = useRef();
  const theDate = new Date();
  const dispatch = useDispatch();
  const handleAddItem = (e) => {
    e.preventDefault();
    title.current.value &&
      price.current.value !== "" &&
      dispatch(
        addItem({
          title: title.current.value,
          price: price.current.value,
          date:
            date.current.value ||
            `${theDate.getFullYear()}-${
              theDate.getMonth() + 1
            }-${theDate.getDate()}`,
          type: type.current.value,
        })
      );
    e.target.reset();
  };
  return (
    <div className="input">
      <div className="container">
        <form onSubmit={(e) => handleAddItem(e)}>
          <input
            type="text"
            name="text"
            placeholder="Enter Title"
            autoComplete="off"
            ref={title}
            maxLength="15"
          />
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            ref={price}
            max="100000"
            autoComplete="off"
          />
          <input type="date" name="data" placeholder="Enter Date" ref={date} />
          <label htmlFor="type">Type</label>
          <select name="type" ref={type}>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          <input type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}
