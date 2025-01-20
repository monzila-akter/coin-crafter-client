
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Dashboard from '../layouts/Dashboard/Dashboard';
import WorkerHome from '../layouts/Dashboard/WorkerPanel/WorkerHome/WorkerHome';
import ManageUsers from '../layouts/Dashboard/ManageUsers/ManageUsers';
import PrivateRoute from './PrivateRoute';
import PurchaseCoin from '../layouts/Dashboard/PurchaseCoin/PurchaseCoin';
import Payment from '../layouts/Dashboard/Payment/Payment';
import PaymentHistory from '../layouts/Dashboard/PaymentHistory/PaymentHistory';
import AddNewTask from '../layouts/Dashboard/AddNewTask/AddNewTask';

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
          path: "/login",
          element: <Login></Login>
        }
      ]
    },
    // dashboard here
    {
      path: "/dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
            {
              path: "workerHome",
              element: <WorkerHome></WorkerHome>
            },
            // admin panel
            {
              path: "manageUsers",
              element: <ManageUsers></ManageUsers>
            },
            // buyer routes

            {
              path: "purchaseCoin",
              element: <PurchaseCoin></PurchaseCoin>
            },
            {
              path: "payment/:coins",
              element: <Payment></Payment>
            },
            {
              path: "paymentHistory",
              element: <PaymentHistory></PaymentHistory>
            },
            {
              path: "addNewTask",
              element: <AddNewTask></AddNewTask>
            }
      ]
    }
  ]);

export default router;