import { useEffect } from "react";
import "./App.css";
import useTelegram from "./components/hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />}></Route>
        <Route path={"/form"} element={<Form />}></Route>
        <Route path={"*"} element={<ProductList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
