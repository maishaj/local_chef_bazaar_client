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
import ManageUsers from "../components/AdminDashboard/ManageUsers";
import ManageRequests from "../components/AdminDashboard/ManageRequests";
import PlatformStatistics from "../components/AdminDashboard/PlatformStatistics";
import Error from "../components/Error/Error";
import AboutLayout from "../layouts/AboutLayout";
import ManageReviews from "../components/AdminDashboard/ManageReviews";
import TermsAndConditions from "../components/TermsAndConditions/TermsAndConditions";
import Contact from "../components/Contact/Contact";
import AdminRoute from "./AdminRoute";
import ChefRoute from "./ChefRoute";
import UserRoute from "./UserRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
  },
  {
    path: "/about",
    element: <AboutLayout></AboutLayout>,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions></TermsAndConditions>,
  },
  {
    path: "/contact",
    element: <Contact></Contact>,
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    errorElement: <Error></Error>,
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
    errorElement: <Error></Error>,
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
        element:<MyProfile></MyProfile>,
      },
      {
        path: "my-orders",
        element: (
          <UserRoute>
            <MyOrders></MyOrders>,
         </UserRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <UserRoute>
            <MyReviews></MyReviews>,
          </UserRoute>
        ),
      },
      {
        path: "my-favourites",
        element: (
          <UserRoute>
            <MyFavourites></MyFavourites>,
          </UserRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "create-meal",
        element: (
          <ChefRoute>
            <CreateMeal></CreateMeal>,
          </ChefRoute>
        ),
      },
      {
        path: "my-meal",
        element: (
          <ChefRoute>
            <MyMeals></MyMeals>,
          </ChefRoute>
        ),
      },
      {
        path: "order-request",
        element: (
          <ChefRoute>
            <OrderRequests></OrderRequests>
          </ChefRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <AdminRoute>
            <ManageRequests></ManageRequests>,
          </AdminRoute>
        ),
      },
      {
        path: "platform-statistics",
        element: (
          <AdminRoute>
            <PlatformStatistics></PlatformStatistics>,
          </AdminRoute>
        ),
      },
      {
        path: "manage-reviews",
        element: (
          <AdminRoute>
            <ManageReviews></ManageReviews>,
          </AdminRoute>
        ),
      },
    ],
  },

  {
    path: "/meals",
    element: <AllMealsLayout></AllMealsLayout>,
    errorElement: <Error></Error>,
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
        element: (
          <PrivateRoute>
            <OrderPage></OrderPage>,
          </PrivateRoute>
        ),
      },
    ],
  },
]);
