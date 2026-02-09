import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AllMealsLayout from "../layouts/AllMealsLayout";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../components/MealDetails/MealDetails";
import AllMeals from "../components/AllMeals/AllMeals";
import OrderPage from "../components/OrderPage/OrderPage";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import MyProfile from "../components/UserDashboard/MyProfile";
import MyOrders from "../components/UserDashboard/MyOrders/MyOrders";
import MyReviews from "../components/UserDashboard/MyReviews";
import MyFavourites from "../components/UserDashboard/MyFavourites";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import CreateMeal from "../components/ChefDashboard/CreateMeal";
import MyMeals from "../components/ChefDashboard/MyMeals/MyMeals";
import OrderRequests from "../components/ChefDashboard/OrderRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [{}],
  },

  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "my-reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "my-favourites",
        element: <MyFavourites></MyFavourites>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path:"create-meal",
        element:<CreateMeal></CreateMeal>
      },
      {
        path:"my-meal",
        element:<MyMeals></MyMeals>
      },
      {
        path:"order-request",
        element:<OrderRequests></OrderRequests>
      }
    ],
  },

  {
    path: "/meals",
    element: (
      <PrivateRoute>
        <AllMealsLayout></AllMealsLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AllMeals></AllMeals>,
      },
      {
        path: "meal-details/:id",
        element: <MealDetails></MealDetails>,
      },
      {
        path: "meal-details/:id/place-order",
        element: <OrderPage></OrderPage>,
      },
      {},
    ],
  },
]);
