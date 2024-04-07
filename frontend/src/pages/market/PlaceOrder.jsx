import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../../components/market/CheckoutSteps.jsx';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader.jsx';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice.js';
import { clearCartItems } from '../../slices/cartSlice.js';
import PlaceOrderItems from '../../components/market/PlaceOrderItems.jsx';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-20">
      <div className="flex justify-center mb-4">
        <CheckoutSteps step1 step2 step3 step4 underline="placeorder" />
      </div>
      <div className="flex flex-row justify-between pt-4">
        <div>
          <div className="mb-4">
            <h2 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold">Shipping</h2>
            <p className="fontCera">
              <strong className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Address:</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div className="fontCera mb-4">
            <h2 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold">Payment Method</h2>
            <strong className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Method:</strong>
            {cart.paymentMethod}
          </div>
          <div className="flex flex-col">
            <h2 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold mb-2">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              cart.cartItems.map((cartItem) => {
                return <PlaceOrderItems cartItem={cartItem} key={cartItem._id} />;
              })
            )}
          </div>
        </div>
        <div className="fontCera">
          <h2 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold mb-2">Order Summary</h2>
          <div className="mb-2">
            <span className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Items:</span>${cart.itemsPrice}
          </div>
          <div className=" mb-2">
            <span className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Shipping:</span>${cart.shippingPrice}
          </div>
          <div className="mb-2">
            <span className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Total:</span>${cart.totalPrice}
          </div>
          <div>{error && error?.data?.message}</div>
          <div>
            <button type="button" disabled={cart.cartItems.length === 0} onClick={() => placeOrderHandler()} className="text-[14px] w-auto px-10 rounded-sm h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4">
              Place Order
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
