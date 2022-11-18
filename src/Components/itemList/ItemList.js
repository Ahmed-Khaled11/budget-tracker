import { useDispatch, useSelector } from "react-redux";
import { updateItems } from "../../redux/itemSlice";

import "./itemList.css";
export default function ItemList() {
  let { item } = useSelector((state) => state.item)
  let dispatch = useDispatch()
  const handleActive = (e) => {
    e.target.classList.value.includes("items")
      ? e.target.classList.toggle("active")
      : e.target.parentElement.classList.toggle("active");
  }
  const handleDelete = (title) => {
    item = item.filter((w) => w.title !== title);
    dispatch(updateItems(item));
    localStorage.setItem("itemList", JSON.stringify(item));
  }
    return (
      <div className="itemList container">
        <div className="list">
          Item List :
          {item.length ? (
            item.map((item, index) => (
              <div
                className="items"
                key={index}
                onClick={(e) => handleActive(e)}
              >
                <p>{index + 1}-</p>
                <span className="title">{item.title}</span>|
                <span
                  className="price"
                  style={{ color: item.type === "income" ? "green" : "red" }}
                >
                  ${item.price}
                </span>
                |<span className="date">{item.date}</span>
                |<button onClick={() => handleDelete(item.title)}>Delete</button>
              </div>
            ))
          ) : (
            <span className="empty-data"> "No Items To Show !"</span>
          )}
        </div>
      </div>
    );
      }
      