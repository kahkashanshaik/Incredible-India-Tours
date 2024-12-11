import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../components/common/Logo';
import IconClose from '../Icon/IconClose';
import { toggleSidebar } from '../../app/appSlice';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.authConfig);
    return (
        <div className="sidebar p-5">
            <div className="flex items-center justify-between">
                <button className="btn btn rounded-full p-0 w-10 h-10" onClick={() => dispatch(toggleSidebar())}>
                    <IconClose />
                </button>
                <Logo />
            </div>
            <div className="w-full mt-5">
                <ul className="nav-menu flex flex-col justify-start text-left w-full">
                    <li className="text-left w-full">
                        <NavLink to="/">Places to stay</NavLink>
                    </li>
                    <li className="text-left w-full">
                        <NavLink to="/experiences">Experiences</NavLink>
                    </li>
                    <li className="text-left w-full">
                        <NavLink to="/discover">Discover</NavLink>
                    </li>
                    <li className="text-left w-full">
                        <NavLink to="/test">Help</NavLink>
                    </li>
                    {!user && !token && (
                        <li className="text-left w-full">
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    )}
                    {user && token && (
                        <>
                            <li className="text-left w-full">
                                <NavLink to="/favourites">WishList</NavLink>
                            </li>
                            <li className="text-left w-full">
                                <NavLink to="/my-account">My Account</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
