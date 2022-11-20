import { useDispatch, useSelector } from "react-redux";
import {  updateTasks } from "../../redux/taskSlice";
import "./taskList.css";
export default function ItemList() {
  let dispatch = useDispatch();
  let { tasks } = useSelector((state) => state.tasks);
  let { isActive } = useSelector((state) => state.tasks);

  let localStoragetasks = JSON.parse(localStorage.getItem("tasks"));
  // add key = isActive to all itemes
  tasks = tasks.map((e) => ({ ...e, isActive }));
  if (localStoragetasks) {
    tasks = localStoragetasks;
  }
  // to handle class "isActive" when click on task
  const handleIsActive = (e, currentTask) => {
    console.log(currentTask);
    if (e.target.innerHTML !== "Delete") {
      if (currentTask.isActive) {
        currentTask.isActive = false;
      } else {
        currentTask.isActive = true;
      }
    }
    // update tasks in redux Store
    dispatch(updateTasks(tasks));
    // update tasks in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  // function to delete item from page & localStorage
  const deleteTask = (index) => {
    tasks = tasks.filter((__, i) => index !== i);
    // Delete tasks in redux Store
    dispatch(updateTasks(tasks));
    // delete from localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <div className="tasks container">
      <div className="list">
        Tasks List :
        {tasks.length ? (
          tasks.map((task, index) => (
            <div
              className={`task ${task.isActive ? `active` : ""}`}
              key={index}
              onClick={(e) => handleIsActive(e, task)}
            >
              <p>{index + 1} -</p>
              <span className="title">{task.title}</span>|
              <span
                className="price"
                style={{ color: task.type === "income" ? "green" : "red" }}
              >
                ${task.price}{" "}
                {task.type === "income" ? (
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
              |<span className="date">{task.date}</span>|
              <button onClick={(e) => deleteTask(index)}>Delete</button>
            </div>
          ))
        ) : (
          <span className="empty-data">sorry, No tasks To Show !</span>
        )}
      </div>
    </div>
  );
}
