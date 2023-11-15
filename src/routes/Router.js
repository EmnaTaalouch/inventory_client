import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProductList from 'src/views/products/product_list';
import FormProduct from 'src/views/products/form_product';
import FormProductedit from 'src/views/products/form_edit_product';
import OrderList from 'src/views/orders/orderList';
import UserList from 'src/views/users/userList';
import InvoiceList from 'src/views/invoice/invoiceList';
import UserProfile from 'src/views/users/UserProfile';
import About from 'src/views/home/About';
import GuestGuard from 'src/guards/GuestGuard';
import AuthGuard from 'src/guards/AuthGuard';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';

///import Checkout from 'src/views/home/checkout/Checkout';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Home = Loadable(lazy(() => import('../views/home/Home')));
const Shop = Loadable(lazy(() => import('../views/home/shop/Shop')));
const Checkout = Loadable(lazy(() => import('../views/home/checkout/Checkout')));
const AboutUs = Loadable(lazy(() => import('../views/home/About')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
    {
        path: '/',
        element: <BlankLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'shop', element: <Shop /> },
            { path: 'checkout', element: <Checkout /> },
            { path: 'About', element: <About /> },
        ],
    },
    {
        path: 'dashboard',
        element: (
            <AuthGuard>
                <RoleBasedGuard accessibleRoles={['admin']}>
                    <FullLayout />
                </RoleBasedGuard>
            </AuthGuard>
        ),
        children: [
            //   { path: '/', element: <Navigate to="/dashboard" /> },
            // { element: <Navigate to={'/'} replace />, index: true },
            { path: '', exact: true, element: <Dashboard /> },
            { path: 'sample-page', exact: true, element: <SamplePage /> },
            { path: 'icons', exact: true, element: <Icons /> },
            { path: 'ui/typography', exact: true, element: <TypographyPage /> },
            { path: 'ui/shadow', exact: true, element: <Shadow /> },
            { path: '*', element: <Navigate to="/auth/404" /> },
            {
                path: 'product',
                children: [
                    { path: 'list', element: <ProductList /> },
                    { path: 'add', element: <FormProduct /> },
                    { path: 'edit/:productId', element: <FormProductedit /> }, // Note the ":productId" param
                ],
            },
            {
                path: 'order',
                children: [
                    { path: 'list', element: <OrderList /> },
                    //{ path: 'add', element: <FormProduct /> },
                    //{ path: 'edit', element: <FormProductedit /> },
                ],
            },
            {
                path: 'invoice',
                children: [
                    { path: 'list', element: <InvoiceList /> },
                    //{ path: 'add', element: <FormProduct /> },
                    //{ path: 'edit', element: <FormProductedit /> },
                ],
            },
        ],
    },

    {
        path: '/user',
        element: (
            <AuthGuard>
                <FullLayout />
            </AuthGuard>
        ),
        children: [
            { path: 'list', element: <UserList /> },
            //{ path: 'add', element: <FormProduct /> },
            // { path: 'edit', element: <FormProductedit /> },
            { path: 'profile', element: <UserProfile /> },
        ],
    },

    {
        path: '/auth',

        children: [
            { path: '404', element: <Error /> },
            {
                path: '/auth/register',
                element: (
                    <GuestGuard>
                        <Register />
                    </GuestGuard>
                ),
            },
            {
                path: '/auth/login',
                element: (
                    <GuestGuard>
                        <Login />
                    </GuestGuard>
                ),
            },
            { path: '*', element: <Navigate to="/auth/404" /> },
        ],
    },
];

export default Router;
