import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/">
            <img src="/images/logo.png" alt="Touristic" className="w-9" />
        </Link>
    );
};

export default Logo;
