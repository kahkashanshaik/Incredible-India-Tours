import { useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../features/order/ordersApi';
import IconCalendar from '../components/Icon/IconCalendar';
import { formatDate } from '../app/utils/dateformatter';
import PackageItem from '../components/package/PackageItem';
import IconLoader from '../components/Icon/IconLoader';

const OrderComplete = () => {
    const { orderId } = useParams();
    const { data, isError, error, isLoading } = useGetOrderQuery({ order_id: orderId });
    return (
        <div className="container">
            <div className="content-wrapper flex justify-center">
                <div className="flex flex-col w-full lg:w-1/2 justify-center items-center">
                    <img src="/images/thank-you.png" />
                    <h1 className="heading font-bold">All done, you're going to Trip!</h1>
                    <div className="flex w-full mx-10 shadow-3xl p-5 rounded-md">
                        {isLoading && (
                            <div className="loader">
                                <IconLoader size={100} fill="#29C3E5" />
                            </div>
                        )}
                        {data && data.data && (
                            <div className="mt-5 w-full">
                                <p className="flex gap-3">
                                    <span>
                                        <IconCalendar />
                                    </span>
                                    {formatDate(data.data[0].createdAt)}
                                </p>
                                <div className="package__card__separator"></div>
                                <p className="flex flex-col lg:flex-row justify-between">
                                    <span className="font-bold">Amount paid (INR)</span>
                                    <span>₹{data.metaData.payment_amount}</span>
                                </p>
                                <p className="flex flex-col lg:flex-row justify-between">
                                    <span className="font-bold">Transactio ID</span>
                                    <span>{data.metaData.payment_id}</span>
                                </p>
                                <p className="my-4">Package Details</p>
                                <PackageItem pkg={data.data[0]} packageType={data.metaData.package_type} showFavWidget={false} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;
