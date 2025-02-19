
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
import AdminRoute from './AdminRoute';
import ManageTasks from '../layouts/Dashboard/ManageTasks/ManageTasks';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Services from '../pages/Services/Services';
import Tasks from '../pages/Tasks/Tasks';
import Details from '../pages/Tasks/Details';
import Payments from '../pages/Payments/Payments';
import AdminProfile from '../layouts/Dashboard/AdminProfile/AdminProfile';
import BuyerProfile from '../layouts/Dashboard/BuyerProfile/BuyerProfile';
import WorkerProfile from '../layouts/Dashboard/WorkerProfile/WorkerProfile';

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "/services",
          element: <Services></Services>
        },
        {
          path: "/tasks",
          element: <PrivateRoute><Tasks></Tasks></PrivateRoute>
        },
        {
          path: "/details/:id",
          element: <Details></Details>
        },
        {
          path: "/payments",
          element: <Payments></Payments>
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
            
            // admin panel
            {
              path: "manageUsers",
              element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            }, 

            {
             path: "adminHome",
             element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
           {
            path: "adminProfile",
            element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
           },
            {
              path: "manageTasks",
              element: <AdminRoute><ManageTasks></ManageTasks></AdminRoute>
            },

            // buyer routes
             {
               path: "buyerHome",
               element: <BuyerHome></BuyerHome>
             },
             {
              path: "buyerProfile",
              element: <BuyerProfile></BuyerProfile>
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
              path: "workerHome",
              element: <WorkerHome></WorkerHome>
            },
            
              {
                path: "workerProfile",
                element: <WorkerProfile></WorkerProfile>
              },
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