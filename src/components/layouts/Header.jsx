import { NavLink } from 'react-router-dom';
import IconMenu from '../Icon/IconMenu';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '../Icon/IconClose';
import { toggleSidebar } from '../../app/appSlice';
import Logo from '../../components/common/Logo';

const Header = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.authConfig);
    const appConfig = useSelector((state) => state.appConfig);
    return (
        <>
            <header>
                <div className="grid grid-cols-12 gap-2 items-center py-5 px-5 shadow-sm">
                    <div className="lg:col-span-2 col-span-6 flex lg:justify-center items-center">
                        <Logo />
                        <span className="font-extrabold text-lg text-primary-dark mt-3">TOURISTIC</span>
                    </div>
                    <div className="hidden lg:block col-span-7 justify-center">
                        <ul className="nav-menu">
                            <li>
                                <NavLink to="/">Places to stay</NavLink>
                            </li>
                            <li>
                                <NavLink to="/experiences">Experiences</NavLink>
                            </li>
                            <li>
                                <NavLink to="/discover">Discover</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden lg:block col-span-3">
                        <ul className="flex gap-4 justify-end nav-menu">
                            {/* <li>
                                <NavLink to="/test">
                                    <Cart />
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink to="/test">Help</NavLink>
                            </li>
                            {!user && !token && (
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            )}
                            {user && token && (
                                <>
                                    <li>
                                        <NavLink to="/favourites">WishList</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/my-account">My Account</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="lg:hidden col-span-6">
                        <button
                            type="button"
                            className="float-right btn rounded-full p-0 w-10 h-10"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            {!appConfig.Sidebar ? <IconMenu /> : <CloseIcon />}
                        </button>
                    </div>
                </div>
            </header>
            <Sidebar />
        </>
    );
};

export default Header;
