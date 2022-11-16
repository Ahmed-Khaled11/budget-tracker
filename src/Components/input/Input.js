import React, { useRef } from "react";
import "./input.css";

import { useDispatch } from "react-redux";
import { addItem } from "../../redux/itemSlice";

export default function Input() {



  const title = useRef();
  const number = useRef();
    const date = useRef();
    const type = useRef();
  const handleAddItem = (e) => {
    e.preventDefault();
    title.current.value &&
      number.current.value !== "" &&
      dispatch(
        addItem({
          title: title.current.value,
          number: number.current.value,
          date: date.current.value,
          type: type.current.value
        })
      );
    e.target.reset()
  }


  const dispatch = useDispatch()
  

  
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
          />
          <input
            type="number"
            name="amount"
            placeholder="Enter Number"
            ref={number}
          />
          <input type="date" name="data" placeholder="Enter Date" ref={date} />
          <label htmlFor="type">Type</label>

          <select name="type" ref={type}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}
