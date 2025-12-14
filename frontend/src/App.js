import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetail from './pages/ProductDetail';
import ProductListPage from "./pages/ProductListPage";
import "./assets/css/style.css";
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:sku" element={<ProductDetail />} />
        <Route path="/products/:categorySlug" element={<ProductListPage />} />
      </Routes>
      <Contact/>
      <Footer />
    </Router>
  );
}

export default App;
