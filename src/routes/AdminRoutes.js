import { lazy } from 'react';

// project imports
import AdminLayout from 'layout/AdminLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Map = Loadable(lazy(() => import('views/map')));

// admin routing
const Admin = Loadable(lazy(() => import('views/admin')));
const DiseaseAdmin = Loadable(lazy(() => import('views/disease-admin')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/',
    element: <AdminLayout />,
    children: [
        {
            path: '/admin/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/admin/map',
            element: <Map />
        },
        {
            path: '/admin',
            element: <Admin />
        },
        {
            path: '/admin/disease',
            element: <DiseaseAdmin />
        }
    ]
};

export default AdminRoutes;
