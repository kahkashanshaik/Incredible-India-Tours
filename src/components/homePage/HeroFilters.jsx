import { useState } from 'react';
import { useGetCategoriesQuery } from '../../features/categories/categoriesApi';
import IconSearch from '../Icon/IconSearch';
import { useNavigate } from 'react-router-dom';

const HeroFilters = () => {
    const { data: categories } = useGetCategoriesQuery();
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [days, setDays] = useState('');
    const [members, setMembers] = useState('');
    function actionHandleSearch() {
        if (!category || !days) return;
        navigate(`/discover?category=${category}&days=${days}&members=${members}`);
    }
    return (
        <div className="lg:absolute lg:-top-7 flex justify-center mx-auto w-full z-50">
            <div className="hero-filters shadow-[rgba(0, 0, 0, 0.2)]">
                <div className="grid grid-cols-7 gap-2 lg:gap-8 lg:px-3">
                    <div className="col-span-7 lg:col-span-2">
                        <h3 className="font-bold">Package</h3>
                        <select className="form-select-sm form-select" placeholder="" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">What is your package type</option>
                            {categories &&
                                categories.map((category) => {
                                    return (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="col-span-7 lg:col-span-2">
                        <h3 className="font-bold">Day's</h3>
                        <select className="form-select-sm form-select" value={days} onChange={(e) => setDays(e.target.value)}>
                            <option value="">How many day's</option>
                            <option value="1">1 Day</option>
                            <option value="2">2 Day</option>
                            <option value="3">3 Day</option>
                            <option value="4">4 Day</option>
                            <option value="5">5 Day</option>
                            <option value="6">6 Day</option>
                        </select>
                    </div>
                    <div className="col-span-7 lg:col-span-2">
                        <h3 className="font-bold">Guests</h3>
                        <input className="form-input-sm placeholder:text-slate-900" placeholder="How may guests?" defaultValue={members} onChange={(e) => setMembers(e.target.value)} />
                    </div>
                    <div className="col-span-7 lg:col-span-1">
                        <div className="flex justify-center items-center">
                            {/* button for desktop */}
                            <button onClick={() => actionHandleSearch()} className="bg-primary hidden lg:flex w-11 h-11 text-center  justify-center items-center rounded-full">
                                <IconSearch fill="true" className="text-white mx-auto" />
                            </button>
                            {/* button for mobile */}
                            <button onClick={() => actionHandleSearch()} className="bg-primary h-10 text-center flex justify-center items-center rounded-md w-full lg:hidden text-white font-bold">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroFilters;
