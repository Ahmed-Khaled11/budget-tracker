import Header from "./Components/header/Header";
import Input from "./Components/input/Input";
import TaskList from "./Components/taskList/TaskList";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Input />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
