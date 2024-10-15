import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home'
import Root from "../pages/Root/Root";
import RootDashboard from "../pages/Dashboard/RootDashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AddClient from "../pages/Dashboard/Crm/Client/AddClient/AddClient";
import Clients from "../pages/Dashboard/Crm/Client/Clients/Clients";
import Settings from "../pages/Dashboard/Settings/Settings";
import Login from "../pages/Login/Login";

const Rout = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [{
            path: '/',
            element: <Home />
        }]
    },
    {
        path : '/login',
        element : <Login />
    },
    {
        path: '/dashboard',
        element: <RootDashboard />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardHome />
            },
            {
                path: "/dashboard/crm/client/add",
                element: <AddClient />
            },
            {
                path: "/dashboard/crm/client/list",
                element: <Clients />
            },


            
            {
                path: "/dashboard/setting",
                element: <Settings />
            },
        ]
    }
]);

export default Rout;