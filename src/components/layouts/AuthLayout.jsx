import { Suspense, useEffect } from 'react';
import App from '../../App';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.authConfig);
    // Redirect to login page if user is not logged in
    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
        }
    }, [user, token]);
    return (
        <App>
            <Header />
            <div>{children}</div>
            <Footer />
        </App>
    );
};

export default AuthLayout;
