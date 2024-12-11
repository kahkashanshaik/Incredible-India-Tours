import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../app/authSlice';
import BackButton from '../components/common/BackButton';
import { setPageTitle } from '../app/appSlice';
import IconUser from '../components/Icon/IconUser';
import IconLogout from '../components/Icon/IconLogout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import IconLoader from '../components/Icon/IconLoader';
import IconCalendar from '../components/Icon/IconCalendar';
import { useGetProfileQuery, useLogoutMutation, useUpdateProfileMutation } from '../features/account/accountApi';
import { useGetOrdersQuery } from '../features/order/ordersApi';
import { formatDate } from '../app/utils/dateformatter';

const MyAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profileFormData, setProfileFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        current_password: '',
        new_password: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postalCode: '',
    });
    const [activeTab, setActiveTab] = useState('personal_info');
    const [logoutAction, { data }] = useLogoutMutation();
    // profile
    const { data: profileData, isLoading } = useGetProfileQuery(undefined, { refetchOnMountOrArgChange: true });
    const [updateProfile, { data: updatedProfileData, isError: isProfileUpdateErr, isLoading: profileUpdateLoading, error }] = useUpdateProfileMutation();
    // Orders
    const { data: ordersList, isLoading: isFetchingOrders } = useGetOrdersQuery();
    // Get profile details
    useEffect(() => {
        if (profileData) {
            setProfileFormData((oldValues) => {
                const tmpData = { ...oldValues };
                for (const valKey in tmpData) {
                    if (profileData[valKey]) tmpData[valKey] = profileData[valKey];
                    else tmpData[valKey] = '';
                }
                return tmpData;
            });
        }
    }, [profileData]);
    // Form Initialization
    const formik = useFormik({
        initialValues: profileFormData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            full_name: Yup.string().required('Full name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phone: Yup.string().required('Phone number is required'),
            current_password: Yup.string(),
            new_password: Yup.string(),
            address_1: Yup.string().required('Address is required'),
            address_2: Yup.string(),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            postalCode: Yup.string().required('Postal Code is required'),
        }),
        onSubmit: (values) => {
            const { email, ...formValues } = values;
            updateProfile(formValues);
            formik.values.current_password = '';
            formik.values.new_password = '';
        },
    });
    // logout user
    function actionHandleLogout() {
        logoutAction();
    }
    // set page title and logout user
    useEffect(() => {
        if (data) {
            dispatch(logout());
            navigate('/login');
        }
        dispatch(setPageTitle('Account Settings'));
    }, [data]);
    return (
        <div className="container">
            <div className="content-wrapper flex flex-col p-5">
                <span>
                    <BackButton />
                </span>
                <h1 className="text-3xl font-semibold mt-2">Account Settings</h1>
                <div className="account__settings">
                    <div className="col-span-1 flex flex-col gap-5">
                        <button onClick={() => setActiveTab('personal_info')} className="as__tab_title">
                            <IconUser />
                            <p className={`${activeTab === 'personal_info' ? 'active' : ''}`}>Personal Info</p>
                        </button>
                        <button onClick={() => setActiveTab('my_bookings')} className="as__tab_title">
                            <IconCalendar />
                            <p className={`${activeTab === 'my_bookings' ? 'active' : ''}`}>My Bookings</p>
                        </button>
                        <button onClick={() => actionHandleLogout()} className="as__tab_title">
                            <IconLogout />
                            <p className={`${activeTab === 'logout' ? 'active' : ''}`}>Logout</p>
                        </button>
                    </div>
                    <div className="col-span-2">
                        <div className="as__tab_content">
                            {isLoading && (
                                <div className="loader">
                                    <IconLoader size={100} fill="#29C3E5" />
                                </div>
                            )}
                            {activeTab === 'personal_info' && (
                                <>
                                    {isProfileUpdateErr && <p className="mb-5 text-red-500 font-medium">{error?.data?.result?.error}</p>}
                                    {updatedProfileData && <p className="mb-5 text-green-700 font-medium">{updatedProfileData?.message}</p>}
                                    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Full Name */}
                                        <div className={`col-span-1 ${formik.errors.full_name && formik.touched.full_name ? 'has-error' : ''}`}>
                                            <label htmlFor="full_name">Full Name</label>
                                            <input type="text" id="full_name" name="full_name" value={formik.values.full_name} onChange={formik.handleChange} className="form-input" />
                                            {formik.errors.full_name && formik.touched.full_name && <span className="text-red-600 text-xs">{formik.errors.full_name}</span>}
                                        </div>
                                        {/* Email */}
                                        <div className={`col-span-1 ${formik.errors.email && formik.touched.email ? 'has-error' : ''}`}>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" name="email" disabled value={formik.values.email} onChange={formik.handleChange} className="form-input" />
                                            {formik.errors.email && formik.touched.email && <span className="text-red-600 text-xs">{formik.errors.email}</span>}
                                        </div>
                                        {/* Phone */}
                                        <div className={`col-span-1 ${formik.errors.phone && formik.touched.phone ? 'has-error' : ''}`}>
                                            <label htmlFor="phone">Phone</label>
                                            <input type="text" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} className="form-input" />
                                            {formik.errors.phone && formik.touched.phone && <span className="text-red-600 text-xs">{formik.errors.phone}</span>}
                                        </div>
                                        {/* Address 1 */}
                                        <div className={`col-span-1 ${formik.errors.address_1 && formik.touched.address_1 ? 'has-error' : ''}`}>
                                            <label htmlFor="address_1">Address 1</label>
                                            <input type="text" id="address_1" name="address_1" value={formik.values.address_1} onChange={formik.handleChange} className="form-input" />
                                            {formik.errors.address_1 && formik.touched.address_1 && <span className="text-red-600 text-xs">{formik.errors.address_1}</span>}
                                        </div>
                                        {/* Address 2 */}
                                        <div className={`col-span-1 ${formik.errors.address_2 && formik.touched.address_2 ? 'has-error' : ''}`}>
                                            <label htmlFor="address_2">Address 2</label>
                                            <input type="text" id="address_2" name="address_2" value={formik.values.address_2} onChange={formik.handleChange} className="form-input" />
                                            {formik.errors.address_2 && formik.touched.address_2 && <span className="text-red-600 text-xs">{formik.errors.address_2}</span>}
                                        </div>
                                        {/* City */}
                                        <div className={`col-span-1 ${formik.errors.city && formik.touched.city ? 'has-error' : ''}`}>
                                            <label htmlFor="city">City</label>
                                            <input type="text" id="city" name="city" value={formik.values.city} onChange={formik.handleChange} className="form-input" />
                                            {formik.errors.city && formik.touched.city && <span className="text-red-600 text-xs">{formik.errors.city}</span>}
                                        </div>
                                        {/* State */}
                                        <div className={`col-span-1 ${formik.errors.state && formik.touched.state ? 'has-error' : ''}`}>
                                            <label htmlFor="state">State</label>
                                            <input type="text" id="state" name="state" value={formik.values.state} onChange={formik.handleChange} className="form-input" />
                                            {formik.errors.state && formik.touched.state && <span className="text-red-600 text-xs">{formik.errors.state}</span>}
                                        </div>
                                        {/* Postal Code */}
                                        <div className={`col-span-1 ${formik.errors.postalCode && formik.touched.postalCode ? 'has-error' : ''}`}>
                                            <label htmlFor="postalCode">Postal Code</label>
                                            <input type="text" id="postalCode" name="postalCode" value={formik.values.postalCode} onChange={formik.handleChange} className="form-input" />
                                            {formik.errors.postalCode && formik.touched.postalCode && <span className="text-red-600 text-xs">{formik.errors.postalCode}</span>}
                                        </div>
                                        {/* Current Password */}
                                        <div className={`col-span-1 ${formik.errors.current_password && formik.touched.current_password ? 'has-error' : ''}`}>
                                            <label htmlFor="password">Current Password</label>
                                            <input
                                                type="password"
                                                id="current_password"
                                                name="current_password"
                                                value={formik.values.current_password}
                                                onChange={formik.handleChange}
                                                className="form-input"
                                            />
                                            {formik.errors.current_password && formik.touched.current_password && <span className="text-red-600 text-xs">{formik.errors.current_password}</span>}
                                        </div>
                                        {/* New  Password */}
                                        <div className={`col-span-1 ${formik.errors.new_password && formik.touched.new_password ? 'has-error' : ''}`}>
                                            <label htmlFor="new_password">New Password</label>
                                            <input type="password" id="new_password" name="new_password" value={formik.values.new_password} onChange={formik.handleChange} className="form-input" />
                                            {formik.errors.new_password && formik.touched.new_password && <span className="text-red-600 text-xs">{formik.errors.confirm_password}</span>}
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            {profileUpdateLoading ? <IconLoader /> : 'Update Profile'}
                                        </button>
                                    </form>
                                </>
                            )}
                            {activeTab == 'my_bookings' && (
                                <div className="overflow-x-scroll">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>SL.No</th>
                                                <th>Date</th>
                                                <th>Package</th>
                                                <th>Amount Paid</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ordersList &&
                                                (ordersList.length == 0 ? (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">
                                                            No Orders Found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    ordersList.map((order, index) => {
                                                        return (
                                                            <tr key={order._id}>
                                                                <td>{index + 1}</td>
                                                                <td>{formatDate(order.createdAt)}</td>
                                                                <td>{order.package_title}</td>
                                                                <td>₹{order.payment.total}</td>
                                                                <td>
                                                                    <Link to={`/complete/${order._id}`} className="btn">
                                                                        View
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
