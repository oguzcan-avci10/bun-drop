import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";

import Confirmation from "./pages/Confirmation";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/confirmation" element={<Confirmation />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
