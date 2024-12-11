import { useSelector } from 'react-redux';
import IconCart from './Icon/IconCart';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cartConfig);
    const total = cartItems.reduce((accumulator, item) => {
        return accumulator + item.count;
    }, 0);
    return (
        <div className="cart_icon">
            <span className="cart_count">{total}</span>
            <IconCart />
        </div>
    );
};

export default Cart;
