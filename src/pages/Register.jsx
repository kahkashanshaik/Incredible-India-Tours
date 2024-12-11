import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useRegisterMutation } from '../features/auth/authApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../app/appSlice';
import IconLoader from '../components/Icon/IconLoader';

const RegisterPage = () => {
    const [register, { data, isLoading, isError, error }] = useRegisterMutation();
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.authConfig);
    const dispatch = useDispatch();
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
            register(values);
        },
    });
    useEffect(() => {
        if (user && token) {
            navigate('/my-account');
        }
    }, [user, token]);
    useEffect(() => {
        if (data) {
            formik.resetForm();
        }
        dispatch(setPageTitle('Register'));
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
                                autoComplete="off"
                            />
                            {formik.errors.email && <span className="text-red-600 text-xs">{formik.errors.email}</span>}
                        </div>
                        <div className={`${formik.errors.password ? 'has-error' : undefined}`}>
                            <label>Password</label>
                            <input type="password" value={formik.values.password} id="password" className="form-input border-slate-300" onChange={formik.handleChange} autoComplete="off" />
                            {formik.errors.password && <span className="text-red-600 text-xs">{formik.errors.password}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary w-full my-5">
                            {isLoading ? <IconLoader /> : 'Register'}
                        </button>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-700">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
