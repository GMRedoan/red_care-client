import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import CreateDonationReq from "../DashBoardLayout/DashBoard/Donor/CreateDonationReq";
import Loading from "../Shared/Loading";
import MyDonationReq from "../DashBoardLayout/DashBoard/Donor/MyDonationReq";
import Search from "../Pages/Search";
import Profile from "../DashBoardLayout/DashBoard/Profile";
import DonationReq from "../Pages/DonationReq";
import DashBoardLayout from "../DashBoardLayout/DashBoardLayout";
import DashBoard from "../DashBoardLayout/DashBoard/DashBoard";
import DonationReqDetails from "../Pages/DonationReqDetails";
import PrivateRoutes from "./PrivateRoutes";
import DonationReqEdit from "../DashBoardLayout/DonationEdit/DonationReqEdit";
import AllUsers from "../DashBoardLayout/DashBoard/Admin/AllUsers";
import AllRequest from "../DashBoardLayout/DashBoard/AllRequest";
import { axiosInstance } from "../Hooks/UseAxios";
import AdminRoutes from "./AdminRoutes";
import DonorRoutes from "./DonorRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
        loader: async () => {
          const res = await axiosInstance.get("/districts_upazilas");
          return res.data;
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/donationReq",
        element: <DonationReq />,
      },
      {
        path: "/donationReqDetails/:id",
        element: (
          <PrivateRoutes>
            <DonationReqDetails />
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {
          const res = await axiosInstance.get(
            `/donationReqDetails/${params.id}`
          );
          return res.data;
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/search",
        element: <Search />,
        loader: async () => {
          const res = await axiosInstance.get("/districts_upazilas");
          return res.data;
        },
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashBoard />,
        loader: async () => {
          const res = await axiosInstance.get("/users");
          return res.data;
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: async () => {
          const res = await axiosInstance.get("/districts_upazilas");
          return res.data;
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "my-donation-requests",
        element: <DonorRoutes>
          <MyDonationReq />
        </DonorRoutes>,
      },
      {
        path: "create-donation-request",
        element: <DonorRoutes>
          <CreateDonationReq />
        </DonorRoutes>,
        loader: async () => {
          const res = await axiosInstance.get("/districts_upazilas");
          return res.data;
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "donationReqEdit/:id",
        element: <DonationReqEdit />,
        loader: async ({ params }) => {
          const res = await axiosInstance.get(
            `/donationReqDetails/${params.id}`
          );
          return res.data;
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "all-users",
        element:  <AdminRoutes>
          <AllUsers></AllUsers>
        </AdminRoutes>,
        loader: async () => {
          const res = await axiosInstance.get("/users");
          return res.data;
        },
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "all-blood-donation-request",
        element: <AdminRoutes>
          <AllRequest />
        </AdminRoutes>,
      },
    ],
  },
]);
