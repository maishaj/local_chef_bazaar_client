import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Meals from "../components/MealsPage/Meals";
import DashboardLayout from "../layouts/DashboardLayout";
import AllMealsLayout from "../layouts/AllMealsLayout";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../components/MealDetails/MealDetails";
import AllMeals from "../components/AllMeals/AllMeals";
import OrderPage from "../components/OrderPage/OrderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
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
    children: [{

    }],
  },

  {
    path: "/meals",
    element: (
      <PrivateRoute>
        <AllMealsLayout></AllMealsLayout>
      </PrivateRoute>
    ),
    children:[
      {
        index:true,
        element:<AllMeals></AllMeals>
      },
      {
        path: "meal-details/:id",
        element: <MealDetails></MealDetails>,
      },
      {
        path:"meal-details/:id/place-order",
        element:<OrderPage></OrderPage>
      }
    ]
  },

]);
