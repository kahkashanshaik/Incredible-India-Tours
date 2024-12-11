import { useDispatch, useSelector } from 'react-redux';
import { setPriceType } from '../../app/appSlice';
import { Link } from 'react-router-dom';

const PackageTotal = ({ data, checkoutBtn = false }) => {
    const dispatch = useDispatch();
    const { priceType } = useSelector((state) => state.appConfig);
    const { user, token } = useSelector((state) => state.authConfig);
    return (
        <div className="flex flex-col p-5">
            <p className="text-lg font-bold">
                ₹{`${priceType == 'price_deluxe' ? Math.round(data.price_deluxe / data.number_of_nights) : Math.round(data.price_super_deluxe / data.number_of_nights)}`}
                <span className="font-light">/night</span>
            </p>
            <div className="mt-5 flex flex-col gap-2">
                <label className="text-xs text-slate-500">Package Type</label>
                <select className="form-select text-xs" value={priceType} onChange={(e) => dispatch(setPriceType(e.target.value))}>
                    <option value="">package type</option>
                    <option value="price_deluxe">Price Deluxe</option>
                    <option value="price_super_deluxe">Price Super Deluxe</option>
                </select>

                <label className="text-xs text-slate-500 mt-4">Guest</label>
                <p className="border-b-2 border-slate-200 ml-5">{data.pax_count}</p>
            </div>
            <p className="flex justify-between mt-5 mb-2">
                <span>
                    ₹{`${priceType == 'price_deluxe' ? Math.round(data.price_deluxe / data.number_of_nights) : Math.round(data.price_super_deluxe / data.number_of_nights)}`}
                    <span className="font-light">/night</span>
                </span>
                <span>₹{priceType == 'price_deluxe' ? data.price_deluxe : data.price_super_deluxe}</span>
            </p>
            <hr className="h-0 w-full border-b-2 border-slate-200" />
            <p className="flex justify-between mt-5 font-bold">
                <span>Total (INR)</span>
                <span>₹{priceType == 'price_deluxe' ? data.price_deluxe : data.price_super_deluxe}</span>
            </p>
            {/* <button className="btn btn-primary mt-5" onClick={() => actionAddItemToCart(data.package_slug)}>
                                            {cartLoader ? <IconLoader /> : 'Add to cart'}
                                        </button> */}
            {checkoutBtn && user && token && (
                <Link to={`/checkout/${data.package_slug}`} className="btn bg-orange-400  mt-5">
                    Reserve
                </Link>
            )}
            {!user && !token && (
                <Link to="/login" className="btn bg-orange-400  mt-5">
                    Login to book now
                </Link>
            )}
        </div>
    );
};

export default PackageTotal;
