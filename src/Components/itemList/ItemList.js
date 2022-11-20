import { useDispatch, useSelector } from "react-redux";
import { updateIsActive, updateItems } from "../../redux/itemSlice";
import "./itemList.css";
export default function ItemList() {
  let dispatch = useDispatch();
  let { items } = useSelector((state) => state.items);
  let { isActive } = useSelector((state) => state.items);

  let localStorageItems = JSON.parse(localStorage.getItem("itemList"));
  // add key = isActive to all itemes
  items = items.map((e) => ({ ...e, isActive }));
  if (localStorageItems) {
    items = localStorageItems;
  }
  // to handle class |isActive| when click on task
  const handleIsActive = (e, currentIndex) => {
    let index = items.indexOf(currentIndex);
    if (e.target.innerHTML !== "Delete") {
      if (currentIndex.isActive) {
        items[index].isActive = false;
        dispatch(updateIsActive(false));
      } else {
        items[index].isActive = true;
        dispatch(updateIsActive(true));
      }
    }
    // update items in localStorage
    localStorage.setItem("itemList", JSON.stringify(items));
    // update items in redux Store
    dispatch(updateItems(items));
  };
  // function to delete item from page & localStorage
  const deleteItem = (index) => {
    items = items.filter((__, i) => index !== i);
    dispatch(updateItems(items));

    // delete from localStorage
    localStorage.setItem("itemList", JSON.stringify(items));
  };

  return (
    <div className="itemList container">
      <div className="list">
        Item List :
        {items.length ? (
          items.map((item, index) => (
            <div
              className={`items ${item.isActive ? `active` : ""}`}
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
        ) : (
          <span className="empty-data">sorry, No Items To Show !</span>
        )}
      </div>
    </div>
  );
}
