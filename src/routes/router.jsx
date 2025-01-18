
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Dashboard from '../layouts/Dashboard/Dashboard';
import WorkerHome from '../layouts/Dashboard/WorkerPanel/WorkerHome/WorkerHome';
import ManageUsers from '../layouts/Dashboard/ManageUsers/ManageUsers';

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
      element: <Dashboard></Dashboard>,
      children: [
            {
              path: "workerHome",
              element: <WorkerHome></WorkerHome>
            },
            // admin panel
            {
              path: "manageUsers",
              element: <ManageUsers></ManageUsers>
            }
      ]
    }
  ]);

export default router;