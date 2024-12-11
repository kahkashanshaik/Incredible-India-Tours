import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../components/layouts/DefaultLayout';
import { routes } from './routes';
import AuthLayout from '../components/layouts/AuthLayout';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.auth ? <AuthLayout>{route.element}</AuthLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
