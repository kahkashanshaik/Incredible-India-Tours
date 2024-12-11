import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { setPageTitle } from '../app/appSlice';
import { useLoginMutation } from '../features/auth/authApi';
import IconLoader from '../components/Icon/IconLoader';
import { setAccessToken, setUser } from '../app/authSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.authConfig);
    const [login, { data, error, isError, isLoading }] = useLoginMutation();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email').required('Email address is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values) => {
            login(values);
        },
    });
    useEffect(() => {
        if (user && token) {
            navigate('/');
        }
    }, [user, token]);
    useEffect(() => {
        // Side effect when form submits
        if (data) {
            dispatch(setUser(data.result.data));
            dispatch(setAccessToken(data.access_token));
            navigate('/');
        }
        dispatch(setPageTitle('Login'));
    }, [data, dispatch]);
    return (
        <div className="container">
            <div className="content-wrapper flex justify-center items-center">
                <div className=" w-11/12 lg:w-1/2 shadow-md p-2 lg:p-5 my-5">
                    <p className="text-center text-base">Sign In to Touristic</p>
                    <form onSubmit={formik.handleSubmit} className="mt-5 px-5">
                        {isError && <p className="mb-5 text-red-500 font-medium">{error?.data.result.error}</p>}
                        {data && <p className="mb-5 text-green-700 font-medium">{data?.message}</p>}
                        <div className={` mb-4 ${formik.errors.email ? 'has-error' : undefined}`}>
                            <label>Email</label>
                            <input
                                type="email"
                                value={formik.values.email}
                                id="email"
                                className="form-input border-slate-300"
                                placeholder="Enter your email address.."
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email && <span className="text-red-600 text-xs">{formik.errors.email}</span>}
                        </div>
                        <div className={`${formik.errors.password ? 'has-error' : undefined}`}>
                            <label>Password</label>
                            <input type="password" value={formik.values.password} id="password" className="form-input border-slate-300" onChange={formik.handleChange} />
                            {formik.errors.password && <span className="text-red-600 text-xs">{formik.errors.password}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary w-full my-5">
                            {isLoading ? <IconLoader /> : 'Login'}
                        </button>
                        <p className="text-blue-800">
                            <Link to="/">Forgot Password?</Link>
                        </p>
                        <p>
                            Dont have account?{' '}
                            <Link to="/register" className="text-blue-700">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
