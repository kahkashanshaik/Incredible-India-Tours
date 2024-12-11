import { Link } from 'react-router-dom';
import { useGetFavouritesQuery } from '../features/account/accountApi';

const Favourites = () => {
    const { data: packages } = useGetFavouritesQuery();
    return (
        <div className="container">
            <h1 className="text-primary-dark text-black text-center mt-5 text-2xl md:text-3xl font-bold mb-5">Browse your favourite List</h1>
            <div className="content-wrapper flex-col lg:flex-row gap-5">
                <div className="lg:w-9/12 w-full">
                    <div className="packages__container">
                        {packages &&
                            packages.data &&
                            packages.data.map((pkg) => {
                                return (
                                    <div key={pkg._id} className="col-span-2">
                                        {/* Package Card */}
                                        <div className="package__card">
                                            {/* Package Image */}
                                            <div className="package__card__image">
                                                <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${pkg.featured_image}`} alt={pkg.package_title} />
                                            </div>
                                            {/* Package content */}
                                            <div className="package__card__content">
                                                <div>
                                                    <p className="text-xs">
                                                        {pkg.number_of_days} Days , {pkg.number_of_nights} Nights
                                                    </p>
                                                    <div className="package__card__content__header">
                                                        <h2 className="package__title">{pkg.package_title}</h2>
                                                    </div>
                                                    {pkg.package_inclusions.length > 0 && (
                                                        <div className="package__inclusions">
                                                            <>
                                                                {pkg.package_inclusions.map((inclusion, index) => {
                                                                    if (index > 2) return;
                                                                    return (
                                                                        <span key={inclusion}>
                                                                            {inclusion} {index < 1 && ','}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </>
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Package Footer */}
                                                <div className="package__content__footer">
                                                    <Link to={`/discover/${pkg.package_slug}`} className="package__view__more">
                                                        View More
                                                    </Link>
                                                    <div className="package__pricing">
                                                        <p>Total ₹ {pkg.price_deluxe}</p>
                                                        <p>
                                                            {' '}
                                                            <span className="font-bold">₹{Math.round(pkg.price_deluxe / pkg.number_of_nights)}</span>/night
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="package__card__separator"></div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favourites;
