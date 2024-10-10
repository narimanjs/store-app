import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<ProductList />}
          />
          <Route
            path='/product/:id'
            element={<ProductDetail />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
