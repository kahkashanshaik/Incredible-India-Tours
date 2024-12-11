import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { usePaymentIntentMutation } from '../features/checkout/checkoutApi';
const CheckoutForm = ({ amount, package_id, package_slug, price_type }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);
    const [actionCreatePaymentIntent, { isError }] = usePaymentIntentMutation();
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            // Show error to your customer
            setErrorMessage(submitError.message);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret from your server endpoint
        const res = await actionCreatePaymentIntent({
            amount: amount,
            package_id: package_id,
            price_type: price_type,
        }).unwrap();
        if (isError) {
            setErrorMessage('Could not able to create payment details please try! again');
        }
        const clientSecret = res.client_secret;
        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret: clientSecret,
            confirmParams: {
                return_url: `${import.meta.env.VITE_APP_URL}/complete/${res.order_id}`,
            },
        });
        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" className="btn btn-primary w-full mt-5" disabled={!stripe || !elements}>
                Pay
            </button>
            {/* Show error message to your customers */}
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default CheckoutForm;
