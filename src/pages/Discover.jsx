import { useEffect, useState } from 'react';
import IconCaretsDown from '../components/Icon/IconCaretsDown';
import { useGetCategoriesQuery } from '../features/categories/categoriesApi';
import { useGetPackagesMutation } from '../features/filters/filtersApi';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/common/Pagination';
import IconLoader from '../components/Icon/IconLoader';
import { Range, getTrackBackground } from 'react-range';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../app/appSlice';
import PackageItem from '../components/package/PackageItem';

const Discover = () => {
    const dispatch = useDispatch();
    const [openFilters, setOpenFilters] = useState({
        category: true,
        packageType: true,
        members: true,
        days: true,
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: categories } = useGetCategoriesQuery();
    const [getPackages, { data: packages, isLoading }] = useGetPackagesMutation();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [packageType, setPackageType] = useState('price_deluxe');
    const [members, setMembers] = useState('');
    const [days, setDays] = useState([6]);
    const [pagination, setPagination] = useState({ per_page: 5, current_page: 1, sort_by: 'desc' });
    const [page, setPage] = useState(1);
    function actionOpenFilters(key) {
        setOpenFilters({
            ...openFilters,
            [key]: !openFilters[key],
        });
    }
    function actionSetPage(page) {
        setPage(page);
        setPagination({ ...pagination, current_page: page });
    }
    useEffect(() => {
        if (searchParams) {
            setSelectedCategory(searchParams.get('category') ? searchParams.get('category') : '');
            setDays(searchParams.get('days') ? [searchParams.get('days')] : [6]);
            setMembers(searchParams.get('members') ? searchParams.get('members') : '');
        }
        dispatch(setPageTitle('Discover'));
    }, [searchParams, dispatch]);
    useEffect(() => {
        getPackages({ filters: { category: selectedCategory, members: members, days: days }, pagination: pagination });
    }, [selectedCategory, packageType, pagination, page, members, days]);

    return (
        // MAIN CONTAINER
        <>
            <div className="container">
                <h1 className="text-primary-dark text-black text-center mt-5 md:text-3xl font-bold">A must-visit destination for your next adventure!</h1>
                <div className="content-wrapper flex-col lg:flex-row gap-5">
                    {/* Filters */}
                    <div className="lg:w-3/12 w-full">
                        <div className="filter__card">
                            <div className="filter__options">
                                {/* Category Filter */}
                                <div className="filter__option">
                                    <div className="filter__option__header">
                                        <h4 className="text-gray">Category</h4>
                                        <button onClick={() => actionOpenFilters('category')}>{openFilters.category ? <IconCaretsDown /> : <IconCaretsDown className="transform rotate-90" />}</button>
                                    </div>
                                    {openFilters.category && (
                                        <div className="filter__option__content">
                                            <ul>
                                                {categories &&
                                                    categories.map((category) => {
                                                        return (
                                                            <li key={category._id}>
                                                                <input
                                                                    type="radio"
                                                                    id={category._id}
                                                                    checked={selectedCategory == category._id ? true : false}
                                                                    onChange={() => setSelectedCategory(category._id)}
                                                                />
                                                                <label htmlFor={category._id}>{category.name}</label>
                                                            </li>
                                                        );
                                                    })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {/* Package Type */}
                                <div className="filter__option">
                                    <div className="filter__option__header">
                                        <h4 className="text-gray">Package Type</h4>
                                        <button onClick={() => actionOpenFilters('packageType')}>
                                            {openFilters.packageType ? <IconCaretsDown /> : <IconCaretsDown className="transform rotate-90" />}
                                        </button>
                                    </div>
                                    {openFilters.packageType && (
                                        <div className="filter__option__content">
                                            <ul>
                                                <li>
                                                    <input type="radio" id="price_deluxe" checked={packageType == 'price_deluxe' ? true : false} onChange={() => setPackageType('price_deluxe')} />
                                                    <label htmlFor="price_deluxe">Deluxe</label>
                                                </li>
                                                <li>
                                                    <input
                                                        type="radio"
                                                        id="price_super_deluxe"
                                                        checked={packageType == 'price_super_deluxe' ? true : false}
                                                        onChange={() => setPackageType('price_super_deluxe')}
                                                    />
                                                    <label htmlFor="price_super_deluxe">Standard</label>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {/* Max Persons */}
                                <div className="filter__option">
                                    <div className="filter__option__header">
                                        <h4 className="text-gray">Number of Persons</h4>
                                        <button onClick={() => actionOpenFilters('members')}>{openFilters.members ? <IconCaretsDown /> : <IconCaretsDown className="transform rotate-90" />}</button>
                                    </div>
                                    {openFilters.members && (
                                        <div className="filter__option__content flex flex-wrap">
                                            <ul>
                                                {Array.from({ length: 12 }, (_, index) => index + 1).map((item) => {
                                                    if (item % 2 != 0) return;
                                                    return (
                                                        <li key={item}>
                                                            <input type="radio" id={item} checked={members == item ? true : false} onChange={() => setMembers(item)} />
                                                            <label htmlFor={item}>{item}</label>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {/* Members count */}
                                <div className="filter__option">
                                    <div className="filter__option__header">
                                        <h4 className="text-gray">Days</h4>
                                        <button onClick={() => actionOpenFilters('days')}>{openFilters.days ? <IconCaretsDown /> : <IconCaretsDown className="transform rotate-90" />}</button>
                                    </div>
                                    {openFilters.days && (
                                        <div className="filter__option__content flex flex-wrap">
                                            <div className="relative w-full flex justify-center flex-wrap mt-5">
                                                <Range
                                                    values={days}
                                                    step={1}
                                                    min={1}
                                                    max={12}
                                                    onChange={(days) => setDays(days)}
                                                    renderTrack={({ props, children }) => (
                                                        <div
                                                            onMouseDown={props.onMouseDown}
                                                            onTouchStart={props.onTouchStart}
                                                            style={{
                                                                ...props.style,
                                                                height: '36px',
                                                                display: 'flex',
                                                                width: '100%',
                                                            }}
                                                        >
                                                            <div
                                                                ref={props.ref}
                                                                style={{
                                                                    height: '5px',
                                                                    width: '100%',
                                                                    borderRadius: '4px',
                                                                    background: getTrackBackground({
                                                                        values: days,
                                                                        colors: ['#548BF4', '#ccc'],
                                                                        min: 0,
                                                                        max: 12,
                                                                    }),
                                                                    alignSelf: 'center',
                                                                }}
                                                            >
                                                                {children}
                                                            </div>
                                                        </div>
                                                    )}
                                                    renderThumb={({ props, isDragged }) => (
                                                        <div
                                                            {...props}
                                                            key={props.key}
                                                            style={{
                                                                ...props.style,
                                                                height: '42px',
                                                                width: '42px',
                                                                borderRadius: '4px',
                                                                backgroundColor: '#FFF',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                boxShadow: '0px 2px 6px #AAA',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    height: '16px',
                                                                    width: '5px',
                                                                    backgroundColor: isDragged ? '#548BF4' : '#CCC',
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                <output className="absolute -top-5" id="output">
                                                    {days[0]}
                                                </output>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Packages */}
                    <div className="lg:w-9/12 w-full">
                        <div className="packages__container">
                            {isLoading && (
                                <div className="loader">
                                    <IconLoader size={100} fill="#29C3E5" />
                                </div>
                            )}
                            <div className="packages__header">
                                {/* Pagination Counts */}
                                {packages && (
                                    <p className="text-sm font-">{` showing  ${packages?.metaData.current_page == 1 ? 1 : packages?.metaData.per_page * (packages?.metaData.current_page - 1)} to ${
                                        packages?.metaData.per_page * packages?.metaData.current_page < packages?.metaData.total
                                            ? packages?.metaData.per_page * packages?.metaData.current_page
                                            : packages?.metaData.total
                                    }  of  ${packages?.metaData.total}`}</p>
                                )}
                                <div className="flex gap-3">
                                    <div className="flex items-center gap-2">
                                        <label htmlFor="per_page" className="text-nowrap">
                                            Per Page
                                        </label>
                                        <select className="form-select w-16" onChange={(e) => setPagination({ ...pagination, per_page: e.target.value })}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <select className="form-select w-24" onChange={(e) => setPagination({ ...pagination, sort_by: e.target.value })}>
                                            <option value="desc">Latest</option>
                                            <option value="asc">Oldest</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* Pacakges Listing */}
                            {packages &&
                                packages.data &&
                                packages.data.map((pkg) => {
                                    return (
                                        <div key={pkg._id} className="col-span-2">
                                            {/* Package Card */}
                                            <PackageItem pkg={pkg} packageType={packageType} />
                                            <div className="package__card__separator"></div>
                                        </div>
                                    );
                                })}
                            {packages && packages.data.length > 0 && <Pagination page={page} setPage={actionSetPage} total={packages?.metaData.total_pages} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Discover;
