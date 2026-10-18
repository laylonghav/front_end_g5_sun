import { useState } from "react";
import "./App.css";
import ProductPage from "./pages/admin/ProductPage";
import HomePage from "./pages/admin/HomePage";
import AboutPage from "./pages/admin/AboutPage";
import MainLayout from "./components/layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotfoundPage from "./pages/admin/NotFoundPage";
import ProductDetailPage from "./pages/admin/ProductDetailPage";
import AuthLoyout from "./components/layout/AuthLoyout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserPage from "./pages/admin/UserPage";
import CategoryPage from "./pages/admin/CategoryPage";
import BrandPage from "./pages/admin/BrandPage";
import PosPage from "./pages/admin/PosPage";
import SupplierPage from "./pages/admin/SupplierPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="brand" element={<BrandPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="pos" element={<PosPage />} />
          <Route path="supplier" element={<SupplierPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Route>
        <Route path="/auth" element={<AuthLoyout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
