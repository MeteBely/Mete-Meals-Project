import { useParams } from 'react-router-dom';
import Loader from '../pages/Loader.jsx';
import { useGetOrderByIdQuery, useGetStripePublishableKeyQuery, usePayOrderMutation, useDeliveredOrderMutation } from '../slices/ordersApiSlice';
import { useUpdateToUserBalanceMutation } from '../slices/balanceApiSlice.jsx';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import OrderItem from '../components/OrderItem.jsx';
import Warning from '../components/Warning.jsx';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderByIdQuery(orderId);
  console.log(order);

  const { userInfo } = useSelector((state) => state.auth);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliveredOrderMutation();
  const { data: stripeId, isLoading: loadingStripe, error: errorStripe } = useGetStripePublishableKeyQuery();
  const [updateUserBalance, { isLoading: userBalance }] = useUpdateToUserBalanceMutation();

  const makePayment = async () => {
    if (order.paymentMethod === 'Stripe') {
      const stripe = await loadStripe(stripeId);
      const res = await payOrder({ orderId, details: order.orderItems });
      console.log(res);

      const result = stripe.redirectToCheckout({
        sessionId: res.data.id,
      });
      if (result.error) {
        console.log(result.error);
      }
    } else if (order.paymentMethod === 'Balance') {
      let amount = -order.totalPrice;
      await updateUserBalance({ amount });
      navigate(`/success/order/${order._id}`);
    }
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch(); //anlık olarak sonuç almamızı sağlar.
      toast.success('Order delivered!');
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <div>HATA</div>
  ) : (
    <>
      <div className="flex flex-row justify-evenly mt-20">
        <div>
          <h1 className="text-[#6B6D75] fontCera mb-1 text-[18px]">Order id: {order._id}</h1>
          <div className="fontCera mb-4">
            <h2 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold">Shipping</h2>
            <p>
              <strong className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Name:</strong>
              {order.user.name}
            </p>
            <p>
              <strong className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Email:</strong>
              {order.user.email}
            </p>
            <p>
              <strong className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},
            </p>
            {order.isDelivered ? <Warning message={`delivered on ${order.deliveredAt.substring(0, 10)}`} /> : <Warning message="Not delivered" negative />}
          </div>
          <div className="fontCera mb-4">
            <h2 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold">Payment Method</h2>
            <p>
              <strong className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Method:</strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? <Warning message={`paid on ${order.paidAt.substring(0, 10)}`} /> : <Warning message="Not paid" negative />}
          </div>
          <div className="fontCera">
            <h2 className="text-[32px] tracking-wide text-[#0F346C] font-semibold mb-2">Order Items</h2>
            {order.orderItems.map((item) => {
              return <OrderItem orderItem={item} key={item._id} />;
            })}
          </div>
        </div>
        <div className="fontCera">
          <h2 className="text-[32px] tracking-wide text-[#0F346C] font-semibold mb-2">Order Summary</h2>
          <div className="mb-2">
            <span className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Items:</span>${order.itemsPrice}
          </div>
          <div className=" mb-2">
            <span className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Shipping:</span>${order.shippingPrice}
          </div>
          <div className="mb-2">
            <span className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Total:</span>${order.totalPrice}
          </div>
          <div>
            {userInfo && !order.isPaid && (
              <button className="text-[14px] w-auto px-10 rounded-sm h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4" onClick={makePayment}>
                TEST ÖDEME YAP
              </button>
            )}
            {loadingDeliver && <Loader />}

            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <button className="text-[14px] w-auto px-10 rounded-sm h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4" onClick={deliverOrderHandler}>
                Mark As Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
