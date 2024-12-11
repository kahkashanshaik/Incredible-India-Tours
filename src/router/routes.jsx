import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Experiences = lazy(() => import('../pages/Experiences'));
const Discover = lazy(() => import('../pages/Discover'));
const DiscoverItem = lazy(() => import('../pages/DiscoverItem'));
const Checkout = lazy(() => import('../pages/Checkout'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const LoginPage = lazy(() => import('../pages/Login'));
const RegisterPage = lazy(() => import('../pages/Register'));
const MyAccount = lazy(() => import('../pages/MyAccount'));
const Favourites = lazy(() => import('../pages/Favourites'));
const OrderComplete = lazy(() => import('../pages/OrderComplete'));

const routes = [
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/experiences',
        element: <Experiences />,
    },
    {
        path: '/discover',
        element: <Discover />,
    },
    {
        path: '/discover/:slug',
        element: <DiscoverItem />,
    },
    {
        path: '/checkout/:slug',
        element: <Checkout />,
        auth: true,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/my-account',
        element: <MyAccount />,
        auth: true,
    },
    {
        path: '/favourites',
        element: <Favourites />,
        auth: true,
    },
    {
        path: '/complete/:orderId',
        element: <OrderComplete />,
        auth: true,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
];

export { routes };
