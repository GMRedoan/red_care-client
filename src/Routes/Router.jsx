import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import CreateDonationReq from "../DashBoardLayout/Donor/CreateDonationReq"
import Loading from "../Shared/Loading";
import MyDonationReq from "../DashBoardLayout/Donor/MyDonationReq";
import Search from '../Pages/Search';
import Profile from '../DashBoardLayout/Donor/Profile'
import DonationReq from "../Pages/DonationReq";
import DashBoardLayout from '../DashBoardLayout/DashBoardLayout'
import DashBoard from "../DashBoardLayout/Donor/DashBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/registration',
        element: <Registration></Registration>,
        loader: () => fetch('http://localhost:3000/districts_upazilas'),
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/donation',
        element: <DonationReq>,</DonationReq>
      },
      {
        path: '/search',
        element: <Search></Search>,
        loader: () => fetch('http://localhost:3000/districts_upazilas'),
        hydrateFallbackElement: <Loading></Loading>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      {
        path: 'profile',
        element: <Profile></Profile>,
        loader: () => fetch('http://localhost:3000/districts_upazilas'),
        hydrateFallbackElement: <Loading></Loading>

      },
      {
        path: 'my-donation-requests',
        element: <MyDonationReq></MyDonationReq>
      },
      {
        path: 'create-donation-request',
        element: <CreateDonationReq></CreateDonationReq>
      },
      {
        path: '/dashboard',
        element: <DashBoard></DashBoard>
      }
    ]
  },
  {
    path: '/*',
    element: <Error></Error>
  }
]);
