import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home'
import Root from "../pages/Root/Root";
import RootDashboard from "../pages/Dashboard/RootDashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AddClient from "../pages/Dashboard/Crm/Client/AddClient/AddClient";
import Clients from "../pages/Dashboard/Crm/Client/Clients/Clients";
import Settings from "../pages/Dashboard/Settings/Settings";
import Login from "../pages/Login/Login";
import Private from "../components/Shared/Private";
import Groups from "../pages/Dashboard/Crm/Client/Groups/Groups";
import Accounts from "../pages/Dashboard/Account/Accounts";

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
        element: <Private><RootDashboard /></Private>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardHome />
            },
            {
                path: "/dashboard/crm/client/add",
                element: <Private><AddClient /></Private>
            },
            {
                path: "/dashboard/crm/client/list",
                element: <Clients />
            },
            {
                path: "/dashboard/crm/client/group",
                element: <Groups />
            },
            {
                path: "/dashboard/account/accounts/list",
                element: <Accounts />
            },

            



            
            {
                path: "/dashboard/setting",
                element: <Settings />
            },
        ]
    }
]);

export default Rout;