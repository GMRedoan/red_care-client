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
import { axiosInstance } from "../Hooks/UseAxios";
import AdminRoutes from "./AdminRoutes";
import DonorRoutes from "./DonorRoutes";
import AllRequestRoutes from "./AllRequestsRoutes";
import Error from '../Shared/Error'
import Funding from "../Pages/Funding";
import FundForm from "../Pages/FundForm";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import FAQ from "../Shared/FAQ";
import ContactUs from "../HomeLayout/ExtraSections/ContactUs";
import Blogs from "../HomeLayout/ExtraSections/Blogs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
        loader: async () => {
          const res = await axiosInstance.get("/districts_upazilas");
          return res.data;
        },
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/donationReq",
        element: <DonationReq></DonationReq>,
      },
      {
        path: "/donationReqDetails/:id",
        element: <DonationReqDetails></DonationReqDetails>,
         loader: async ({ params }) => {
          const res = await axiosInstance.get(
            `/donationReqDetails/${params.id}`
          )
          return res.data;
        },
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/search",
        element: <Search></Search>,
        loader: async () => {
          const res = await axiosInstance.get("/districts_upazilas");
          return res.data;
        },
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: '/funding',
        element: <PrivateRoutes>
          <Funding></Funding>
        </PrivateRoutes>,
        loader: async () => {
          const res = await axiosInstance.get("/funds");
          return res.data;
        },
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: '/fundForm',
        element: <PrivateRoutes>
          <FundForm></FundForm>
        </PrivateRoutes>
      },
      {
        path: '/payment-success',
        element: <PrivateRoutes>
          <PaymentSuccess></PaymentSuccess>
        </PrivateRoutes>
      },
    {
      path: '/payment-cancelled',
      element: <PrivateRoutes>
        <PaymentCancel></PaymentCancel>
      </PrivateRoutes>
      },
      {
        path: '/pp',
        element: <PrivateRoutes>
          <PrivacyPolicy></PrivacyPolicy>
        </PrivateRoutes>
      },
      {
        path:'/faq',
        element:<FAQ></FAQ>
      },
      {
        path:'/contact',
        element:<ContactUs></ContactUs>
      },
      {
        path:'/blog',
        element:<Blogs></Blogs>
      }
 ],
  },
{
  path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoutes>
    ),
      children: [
        {
          index: true,
          element: <DashBoard></DashBoard>,
          loader: async () => {
            const res = await axiosInstance.get("/users");
            return res.data;
          },
          hydrateFallbackElement: <Loading></Loading>,
        },
        {
          path: "profile",
          element: <Profile></Profile>,
          loader: async () => {
            const res = await axiosInstance.get("/districts_upazilas");
            return res.data;
          },
          hydrateFallbackElement: <Loading></Loading>,
        },
        {
          path: "my-donation-requests",
          element: <DonorRoutes>
            <MyDonationReq></MyDonationReq>
          </DonorRoutes>,
        },
        {
          path: "create-donation-request",
          element: <DonorRoutes>
            <CreateDonationReq></CreateDonationReq>
          </DonorRoutes>,
          loader: async () => {
            const res = await axiosInstance.get("/districts_upazilas");
            return res.data;
          },
          hydrateFallbackElement: <Loading></Loading>,
        },
        {
          path: "donationReqEdit/:id",
          element: <DonationReqEdit></DonationReqEdit>,
          loader: async ({ params }) => {
            const res = await axiosInstance.get(
              `/donationReqDetails/${params.id}`
            );
            return res.data;
          },
          hydrateFallbackElement: <Loading></Loading>,
        },
        {
          path: "all-users",
          element: <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>,
          loader: async () => {
            const res = await axiosInstance.get("/users");
            return res.data;
          },
          hydrateFallbackElement: <Loading></Loading>,
        },
        {
          path: "all-blood-donation-request",
          element: <AllRequestRoutes></AllRequestRoutes>
        }
      ],
  },
{
  path: '/*',
    element: <Error></Error>
}
]);
