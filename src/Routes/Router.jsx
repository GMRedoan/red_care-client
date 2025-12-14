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
import DonationReq from '../Pages/DonationReq'
import DashBoardLayout from '../DashBoardLayout/DashBoardLayout'
import DashBoard from "../DashBoardLayout/Donor/DashBoard";
import DonationReqDetails from "../Pages/DonationReqDetails";
import PrivateRoutes from "./PrivateRoutes";
import DonationReqEdit from "../DashBoardLayout/DonationEdit/DonationReqEdit";

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
        path: '/donationReq',
        element: <DonationReq></DonationReq>
      },
      {
        path: '/donationReqDetails/:id',
        element: <PrivateRoutes>
          <DonationReqDetails></DonationReqDetails>
        </PrivateRoutes>,
        loader: ({ params }) => fetch(`http://localhost:3000/donationReqDetails/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>
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
        index: true,
        element: <DashBoard></DashBoard>
      },
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
        element: <CreateDonationReq></CreateDonationReq>,
        loader: () => fetch('http://localhost:3000/districts_upazilas'),
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: 'donationReqEdit/:id',
        element: <DonationReqEdit></DonationReqEdit>,
        loader: ({ params }) => fetch(`http://localhost:3000/donationReqDetails/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>
      }
    ]
  },
  {
    path: '/*',
    element: <Error></Error>
  }
]);
