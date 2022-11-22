import Header from "./Components/header/Header";
import Input from "./Components/input/Input";
import ItemList from "./Components/itemList/ItemList";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Input />
        <ItemList />
      </div>
    </Provider>
  );
}

export default App;
