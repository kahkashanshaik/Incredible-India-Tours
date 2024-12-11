import { Link } from 'react-router-dom';
import Favourite from '../Favourite';

const PackageItem = ({ pkg, packageType, showFavWidget = true }) => {
    return (
        <>
            {pkg && (
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
                                {showFavWidget && <Favourite slug={pkg.package_slug} />}
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
                                <p>Total ₹ {pkg[packageType]}</p>
                                <p>
                                    {' '}
                                    <span className="font-bold">₹{Math.round(pkg[packageType] / pkg.number_of_nights)}</span>/night
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PackageItem;
