// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import { Route, RouterProvider, createRoutesFromElements } from "react-router";
// import { createBrowserRouter } from "react-router-dom";

// import PrivateRoute from "./components/PrivateRoute";

// // Auth
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import AdminRoute from "./pages/Admin/AdminRoute";
// import Profile from "./pages/User/Profile";
// import UserList from "./pages/Admin/UserList";

// import CategoryList from "./pages/Admin/CategoryList";

// import ProductList from "./pages/Admin/ProductList";
// import AllProducts from "./pages/Admin/AllProducts";
// import ProductUpdate from "./pages/Admin/ProductUpdate";

// import Home from "./pages/Home.jsx";
// import Favorites from "./pages/Products/Favorites.jsx";
// import ProductDetails from "./pages/Products/ProductDetails.jsx";

// import Cart from "./pages/Cart.jsx";
// import Shop from "./pages/Shop.jsx";

// import Shipping from "./pages/Orders/Shipping.jsx";
// import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
// import Order from "./pages/Orders/Order.jsx";
// import OrderList from "./pages/Admin/OrderList.jsx";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route index={true} path="/" element={<Home />} />
//       <Route path="/favorite" element={<Favorites />} />
//       <Route path="/product/:id" element={<ProductDetails />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/shop" element={<Shop />} />

//       {/* Registered users */}
//       <Route path="" element={<PrivateRoute />}>
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/shipping" element={<Shipping />} />
//         <Route path="/placeorder" element={<PlaceOrder />} />
//         <Route path="/order/:id" element={<Order />} />
//       </Route>

//       <Route path="/admin" element={<AdminRoute />}>
//         <Route path="userlist" element={<UserList />} />
//         <Route path="categorylist" element={<CategoryList />} />
//         <Route path="productlist" element={<ProductList />} />
//         <Route path="allproductslist" element={<AllProducts />} />
//         <Route path="productlist/:pageNumber" element={<ProductList />} />
//         <Route path="product/update/:_id" element={<ProductUpdate />} />
//         <Route path="orderlist" element={<OrderList />} />
//         <Route path="dashboard" element={<AdminDashboard />} />
//       </Route>
//     </Route>
//   )
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <PayPalScriptProvider>
//       <RouterProvider router={router} />
//     </PayPalScriptProvider>
//   </Provider>
// );

import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Components
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./pages/Admin/AdminRoute";

// Auth Pages (small → no need to lazy load)
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Core Pages (small, loaded frequently)
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";

// Lazy-loaded pages (heavy components)
const Profile = lazy(() => import("./pages/User/Profile"));
const Shipping = lazy(() => import("./pages/Orders/Shipping.jsx"));
const PlaceOrder = lazy(() => import("./pages/Orders/PlaceOrder.jsx"));
const Order = lazy(() => import("./pages/Orders/Order.jsx"));

// Admin Pages (lazy loaded)
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.jsx"));
const UserList = lazy(() => import("./pages/Admin/UserList.jsx"));
const CategoryList = lazy(() => import("./pages/Admin/CategoryList.jsx"));
const ProductList = lazy(() => import("./pages/Admin/ProductList.jsx"));
const AllProducts = lazy(() => import("./pages/Admin/AllProducts.jsx"));
const ProductUpdate = lazy(() => import("./pages/Admin/ProductUpdate.jsx"));
const OrderList = lazy(() => import("./pages/Admin/OrderList.jsx"));

// Optional: 404 page
//const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// ⚙️ Loading fallback
const Loader = () => (
  <div className="flex items-center justify-center h-screen text-lg font-semibold">
    Loading...
  </div>
);

// ⚙️ Routes setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      {/* Protected (User) Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/shipping"
          element={
            <Suspense fallback={<Loader />}>
              <Shipping />
            </Suspense>
          }
        />
        <Route
          path="/placeorder"
          element={
            <Suspense fallback={<Loader />}>
              <PlaceOrder />
            </Suspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Suspense fallback={<Loader />}>
              <Order />
            </Suspense>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          path="userlist"
          element={
            <Suspense fallback={<Loader />}>
              <UserList />
            </Suspense>
          }
        />
        <Route
          path="categorylist"
          element={
            <Suspense fallback={<Loader />}>
              <CategoryList />
            </Suspense>
          }
        />
        <Route
          path="productlist"
          element={
            <Suspense fallback={<Loader />}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="allproductslist"
          element={
            <Suspense fallback={<Loader />}>
              <AllProducts />
            </Suspense>
          }
        />
        <Route
          path="productlist/:pageNumber"
          element={
            <Suspense fallback={<Loader />}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="product/update/:_id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductUpdate />
            </Suspense>
          }
        />
        <Route
          path="orderlist"
          element={
            <Suspense fallback={<Loader />}>
              <OrderList />
            </Suspense>
          }
        />
      </Route>

      {/* 404 fallback */}
      {/* <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        }
      /> */}
    </Route>
  )
);

// ⚙️ Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
      }}
    >
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
