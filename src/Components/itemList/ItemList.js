import { useDispatch, useSelector } from "react-redux";
import { updateItems } from "../../redux/itemSlice";
import "./itemList.css";
export default function ItemList() {
  let { item } = useSelector((state) => state.item);
  let dispatch = useDispatch()

  const deleteItem = (index) => {
    item = item.filter((__,i) => i !== index);
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
              >
                <p>{index + 1} -</p>
                <span className="title">{item.title}</span>|
                <span
                  className="price"
                  style={{ color: item.type === "income" ? "green" : "red" }}
                >
                  ${item.price}
                </span>
                |<span className="date">{item.date}</span>
                |<button onClick={(e) => deleteItem(index)}>Delete</button>
              </div>
            ))
          ) : (
            <span className="empty-data"> "No Items To Show !"</span>
          )}
        </div>
      </div>
    );
      }
      