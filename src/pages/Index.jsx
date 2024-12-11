import Slider from '../components/slider/Slider';
import { heroSliderImages, homePageCategories } from '../../data';
import HeroFilters from '../components/homePage/HeroFilters';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../app/appSlice';

const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Home'));
    });
    return (
        // MAIN CONTAINER
        <div className="container">
            <div className="relative">
                <HeroFilters />
                <Slider sliderImgs={heroSliderImages} />
            </div>
            {/* Tour Categories */}
            <div className="content-wrapper grid grid-cols-4 gap-5">
                <div className="col-span-4">
                    <h1 className="heading">A SIGNATURE OF EXCELLENCE</h1>
                </div>
                {homePageCategories.map((category) => {
                    return (
                        <div className="col-span-4 md:col-span-2 lg:col-span-1 h-96 lg:h-72 w-full mb-14 cursor-pointer" key={`category-${category.id}`}>
                            <img src={category.src} className="h-full w-full rounded-lg sc transition-all duration-[0.5s] scale-100 hover:scale-105" />
                            <div className="p-2">
                                <h4 className="text-lg font-bold">{category.title}</h4>
                                <p className="text-xs text-gray">{category.count} people visited</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Featured Section */}
            <div className="content-wrapper featured-section">
                <div className="col-span-3 md:col-span-1 relative">
                    <div className="overlay-content justify-end">
                        <h4>Outdoor gateways</h4>
                        <p>131 stays</p>
                    </div>
                    <img src="/images/featured/img-1.png" />
                </div>
                <div className="col-span-3 md:col-span-1 gap-3">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <div className="overlay-content justify-end">
                                <h4>Outdoor gateways</h4>
                                <p>131 stays</p>
                            </div>
                            <img src="/images/featured/img-3.png" />
                        </div>
                        <div className="relative">
                            <div className="overlay-content justify-end">
                                <h4>Outdoor gateways</h4>
                                <p>131 stays</p>
                            </div>
                            <img src="/images/featured/img-4.png" />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 md:col-span-1 relative">
                    <div className="overlay-content justify-end">
                        <h4>Outdoor gateways</h4>
                        <p>131 stays</p>
                    </div>
                    <img src="/images/featured/img-2.png" />
                </div>
            </div>
            {/* Find new possibilities */}
            <div className="content-wrapper possibilities">
                <div className="col-span-2">
                    <h1 className="heading">FIND NEW POSSIBILITIES</h1>
                </div>
                <div className="col-span-2 md:col-span-1 relative">
                    <div className="overlay-content">
                        <h4 className="text-3xl">Adventure path to your trip</h4>
                        <span>
                            <button>Experiences</button>
                        </span>
                    </div>
                    <img src="/images/possibilities/img-1.png" className="w-full h-full" />
                </div>
                <div className="col-span-2 md:col-span-1 relative">
                    <div className="overlay-content">
                        <h4>Things to do from home</h4>
                        <span>
                            <button>Experiences</button>
                        </span>
                    </div>
                    <img src="/images/possibilities/img-2.png" className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default Index;
