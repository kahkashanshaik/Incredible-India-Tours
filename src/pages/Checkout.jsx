import { useParams } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import { useGetPackageQuery } from '../features/filters/filtersApi';
import PageNotFound from './PageNotFound';
import { useSelector } from 'react-redux';
import PackageItem from '../components/package/PackageItem';
import PackageTotal from '../components/package/PackageTotal';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const Checkout = () => {
    const { slug } = useParams();
    const { data, isError } = useGetPackageQuery(slug, { skip: !slug });
    const { priceType } = useSelector((state) => state.appConfig);
    const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHIABLE_KEY);
    const options = {
        mode: 'payment',
        amount: data?.[priceType],
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {
            /*...*/
        },
    };
    return (
        <>
            <div className="container">
                <div className="relative p-5">
                    {isError && <PageNotFound />}
                    {data && (
                        <>
                            <BackButton />
                            <h1 className="text-3xl font-semibold mt-5">Confirm & pay</h1>
                            <div className="flex flex-col-reverse md:flex-row md:mt-10">
                                <div className="w-full md:w-1/2 px-5 payment__form">
                                    <h1 className="heading mt-0">Book Your Trip</h1>
                                    <Elements stripe={stripePromise} options={options}>
                                        <CheckoutForm amount={data[priceType]} package_id={data._id} package_slug={data.package_slug} price_type={priceType} />
                                    </Elements>
                                </div>
                                <div className="w-full md:w-1/2 mt-5 md:mt-10">
                                    <PackageItem pkg={data} packageType={priceType} />
                                    <PackageTotal data={data} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default Checkout;
