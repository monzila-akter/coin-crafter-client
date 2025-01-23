
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
import MyTasks from '../layouts/Dashboard/MyTasks/MyTasks';
import TaskList from '../layouts/Dashboard/TaskLIst/TaskList';
import TaskDetails from '../layouts/Dashboard/TaskDetails/TaskDetails';
import MySubmissions from '../layouts/Dashboard/MySubmissions/MySubmissions';
import Withdrawal from '../layouts/Dashboard/Withdrawal/Withdrawal';
import BuyerHome from '../layouts/Dashboard/BuyerHome/BuyerHome';
import AdminHome from '../layouts/Dashboard/AdminHome/AdminHome';

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

            {
             path: "adminHome",
             element: <AdminHome></AdminHome>
            },

            // buyer routes
             {
               path: "buyerHome",
               element: <BuyerHome></BuyerHome>
             },
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
            },
            {
              path: "myTasks",
              element: <MyTasks></MyTasks>
            },

            // worker route

            

            {
              path: "taskList",
              element: <TaskList></TaskList>
            },
            {
              path: "taskDetails/:id",
              element: <TaskDetails></TaskDetails>
            },
            {
              path: "mySubmissions",
              element: <MySubmissions></MySubmissions>
            },
            {
              path: "withdrawals",
              element: <Withdrawal></Withdrawal>
            }
      ]
    }
  ]);

export default router;