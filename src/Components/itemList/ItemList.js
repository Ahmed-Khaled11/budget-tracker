import { useDispatch, useSelector } from "react-redux";
import {  updateItems } from "../../redux/itemSlice";
import "./itemList.css";
export default function ItemList() {
  let dispatch = useDispatch();
  let { items } = useSelector((state) => state.items);
  let { isActive } = useSelector((state) => state.items);

  let itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
  // add key {isActive: } to all items
  items = items.map((e) => ({ ...e, isActive }));
  if (itemsFromLocalStorage) {
    items = itemsFromLocalStorage;
  }
  // to handle class "isActive" when click on item
  const handleIsActive = (e, currentItem) => {
    if (e.target.innerHTML !== "Delete") {
      if (currentItem.isActive) {
        currentItem.isActive = false;
      } else {
        currentItem.isActive = true;
      }
    }
    // update items in redux Store
    dispatch(updateItems(items));
    // update items in localStorage
    localStorage.setItem("items", JSON.stringify(items));
  };
  // function to delete item from page & localStorage
  const deleteItem = (index) => {
    items = items.filter((__, i) => index !== i);
    // Delete items in redux Store
    dispatch(updateItems(items));
    // delete from localStorage
    localStorage.setItem("items", JSON.stringify(items));
  };

  return (
    <div className="items container">
      <div className="list">
        <p className="item-list">
          {items.length ? (
            "items List"
          ) : (
            <span> No items To Show, Add One.. !</span>
          )}
        </p>
        {items.length
          ? items.map((item, index) => (
              <div
                className={`item ${item.isActive ? `active` : ""}`}
                key={index}
                onClick={(e) => handleIsActive(e, item)}
              >
                <p>{index + 1} -</p>
                <span className="title">{item.title}</span>|
                <span
                  className="price"
                  style={{ color: item.type === "income" ? "green" : "red" }}
                >
                  ${item.price}{" "}
                  {item.type === "income" ? (
                    <svg
                      xmlns="http://indexww.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-up-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-down-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                      />
                    </svg>
                  )}
                </span>
                |<span className="date">{item.date}</span>|
                <button onClick={(e) => deleteItem(index)}>Delete</button>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
