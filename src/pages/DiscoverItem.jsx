import { useParams } from 'react-router-dom';
import { useGetPackageQuery } from '../features/filters/filtersApi';
import Slider from '../components/slider/Slider';
import IconHome from '../components/Icon/IconHome';
import PageNotFound from './PageNotFound';
import Favourite from '../components/Favourite';
import { useDispatch } from 'react-redux';
import PackageTotal from '../components/package/PackageTotal';
// import { useDispatch, useSelector } from 'react-redux';
// import { addItemToCart, hideCartLoader, showCartLoader } from '../app/cartSlice';
import IconLoader from '../components/Icon/IconLoader';

const DiscoverItem = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    // const { cartLoader } = useSelector((state) => state.cartConfig);
    const { data, isLoading, isError } = useGetPackageQuery(slug, { skip: !slug });
    // const actionAddItemToCart = async (slug) => {
    //     dispatch(showCartLoader());
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //     dispatch(addItemToCart(slug));
    //     dispatch(hideCartLoader());
    // };
    return (
        <>
            <div className="container">
                <div className="relative">
                    {isError && <PageNotFound />}
                    {data && (
                        <>
                            <div className="content-wrapper mb-2 px-2  flex flex-col lg:flex-row justify-between items-start lg:items-center">
                                <h1 className="text-2xl font-bold">{data.package_title} </h1>
                                <Favourite slug={data.package_slug} />
                            </div>
                            <Slider
                                sliderImgs={[
                                    {
                                        id: 'featured_img',
                                        src: `${import.meta.env.VITE_APP_API_BASE_URL}${data.featured_image}`,
                                        title: '',
                                    },
                                    ...data.gallery_images?.map((item, index) => {
                                        return {
                                            id: `gallery_image-${index}`,
                                            src: `${import.meta.env.VITE_APP_API_BASE_URL}${item}`,
                                            title: '',
                                        };
                                    }),
                                ]}
                                marginTop="lg:mt-4"
                            />
                            <div className="content-wrapper flex flex-col lg:flex-row mt-3">
                                <div className="w-full lg:w-2/3 gap-4 flex flex-col lg:pr-5">
                                    <h1 className="heading">Overview </h1>
                                    <div className="flex gap-2 items-center">
                                        <span>
                                            <IconHome color="#29C3E5" size="20" />
                                        </span>
                                        <span className="text-sm font-semibold">
                                            {data?.pax_count} Guests - {data?.number_of_days} Days {data?.number_of_nights}, Nights
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed">{data?.package_desc}</p>
                                    <h1 className="heading">Inclusions </h1>
                                    {data.package_inclusions.length > 0 &&
                                        data.package_inclusions.map((inclusion, index) => {
                                            return <li key={`inclusion-${index}`}>{inclusion}</li>;
                                        })}
                                    <h1 className="heading">Package Itinerary </h1>
                                    <ul className="package_itinerary">
                                        {data.package_itinerary.length > 0 &&
                                            data.package_itinerary.map((itinerary, index) => {
                                                return (
                                                    <li key={index}>
                                                        <div className="day">Day {index + 1}</div>
                                                        <p>{itinerary}</p>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                                <div className="w-full lg:w-1/3 pt-9">
                                    <div className="border-slate-200 border-2 shadow-3xl">
                                        <PackageTotal data={data} checkoutBtn={true} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DiscoverItem;
