import { Suspense } from 'react';
import App from '../../App';
import Header from './Header';
import Footer from './Footer';
const DefaultLayout = ({ children }) => {
    return (
        <App>
            <Header />
            <div>{children}</div>
            <Footer />
        </App>
    );
};

export default DefaultLayout;
