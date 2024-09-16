import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="order" element={<Order />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/confirmation" element={<Confirmation />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
