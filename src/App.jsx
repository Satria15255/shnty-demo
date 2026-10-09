// Tools
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";

// Layout
import MainLayout from "@/layout/MainLayout";

import HomePages from "@/pages/public/home/pages/HomePages";

import AdminRoute from "@/components/admin/route/AdminRoute";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "@/components/common/ScrollToTop";

// AUTH
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const AdminLogin = lazy(() => import("@/pages/auth/AdminLoginPage"));

// PRODUCTS
const ProductsPages = lazy(
  () => import("@/pages/public/products/ProductPages"),
);

const ProductDetail = lazy(
  () => import("@/pages/public/productDetails/ProductDetails"),
);

const FavoriteProducts = lazy(
  () => import("@/pages/customer/FavoriteProducts"),
);

// CART / ORDER
const ShoppingCartPages = lazy(
  () => import("@/features/cart/components/ShoppingCart"),
);

const CheckoutPages = lazy(
  () => import("@/features/orders/components/CheckoutPages"),
);

const SuccessOrderPages = lazy(
  () => import("@/features/orders/components/SuccessOrder"),
);

const OrderPages = lazy(() => import("@/pages/customer/MyOrderPages"));

// PAYMENT
const PaymentOrderPages = lazy(
  () => import("@/features/payment/components/paymentPages"),
);

const PaymentSuccessPages = lazy(
  () => import("@/features/payment/components/PaymentSuccess"),
);

// CUSTOMER
const UserDashboard = lazy(() => import("@/pages/customer/UserDashboard"));

// ADMIN
const AdminLayout = lazy(() => import("@/layout/AdminLayout"));

const AdminProduct = lazy(
  () => import("@/pages/admin/products/ProductManagement"),
);
const UploadProduct = lazy(
  () => import("@/pages/admin/products/components/ProductsUploadForm"),
);

const AdminOrder = lazy(() => import("@/pages/admin/orders/AdminOrders"));

const AdminUserList = lazy(() => import("@/pages/admin/users/AdminUserList"));

const AdminDashboard = lazy(
  () => import("@/pages/admin/dashboard/AdminDashboard"),
);

// CONDITIONAL UI
const SidebarCart = lazy(
  () => import("@/features/cart/components/SidebarCart"),
);
const SidebarProfile = lazy(() => import("@/components/layout/SidebarProfile"));

function App() {
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarCartOpen, setSidebarCartOpen] = useState(false);

  return (
    <main>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-screen flex  justify-center items-center">
            {" "}
            Loading....
          </div>
        }
      >
        <Routes>
          <Route
            element={
              <MainLayout
                handleOpenCart={() => setSidebarCartOpen(true)}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            }
          >
            <Route path="/" element={<HomePages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductsPages />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/my-cart" element={<ShoppingCartPages />} />
            <Route path="/checkout" element={<CheckoutPages />} />
            <Route path="/success-order/:id" element={<SuccessOrderPages />} />
            <Route path="/paymentOrder/:id" element={<PaymentOrderPages />} />
            <Route
              path="/payment-success/:id"
              element={<PaymentSuccessPages />}
            />
            <Route path="/my-orders" element={<OrderPages />} />
            <Route path="/my-favorite" element={<FavoriteProducts />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/product" element={<AdminProduct />} />
            <Route
              path="/admin/product/new-product"
              element={<UploadProduct />}
            />
            <Route path="/admin/all-orders" element={<AdminOrder />} />
            <Route path="/admin/user" element={<AdminUserList />} />
          </Route>
        </Routes>
      </Suspense>

      {sidebarCartOpen && (
        <Suspense fallback={null}>
          <SidebarCart closeSidebarCart={() => setSidebarCartOpen(false)} />
        </Suspense>
      )}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
          <Suspense fallback={null}>
            <SidebarProfile closeSidebar={() => setIsSidebarOpen(false)} />
          </Suspense>
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </main>
  );
}

export default App;
