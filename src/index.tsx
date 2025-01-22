import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import "./index.css";
import Layout from "./layout";
import "./styles.css";
import Categorias_Modal from "./tt";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="test" element={<App />} />
        <Route path="test2" element={<Categorias_Modal />} />
      </Route>
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>
);
