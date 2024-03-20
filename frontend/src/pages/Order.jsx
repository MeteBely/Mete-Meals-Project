import { useParams } from 'react-router-dom';
import Loader from '../pages/Loader.jsx';
import { useGetOrderByIdQuery, useGetStripePublishableKeyQuery, usePayOrderMutation, useDeliveredOrderMutation } from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import OrderItem from '../components/OrderItem.jsx';

const Order = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderByIdQuery(orderId);
  console.log(order);

  const { userInfo } = useSelector((state) => state.auth);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliveredOrderMutation();
  const { data: stripeId, isLoading: loadingStripe, error: errorStripe } = useGetStripePublishableKeyQuery();

  const makePayment = async () => {
    const stripe = await loadStripe(stripeId);
    const res = await payOrder({ orderId, details: order.orderItems });
    console.log(res);

    const result = stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
    if (result.error) {
      console.log(result.error);
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
      <div className="flex flex-row justify-around mt-20">
        <div>
          <h1>Order {order._id}</h1>
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email</strong>
              {order.user.email}
            </p>
            <p>
              <strong>Address </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},
            </p>
            {order.isDelivered ? <div>delivered on {order.deliveredAt}</div> : <div>Not delivered</div>}
          </div>
          <div>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? <div>paid on {order.paidAt}</div> : <div>Not paid</div>}
            <h2>Order Items</h2>
            {order.orderItems.map((item) => {
              return <OrderItem orderItem={item} key={item._id} />;
            })}
          </div>
        </div>
        <div>
          <div>
            <h2>Order Summary</h2>
            <div>Items: ${order.itemsPrice}</div>
          </div>
          <div>
            <h2>Shipping</h2>
            <div>${order.shippingPrice}</div>
          </div>
          <div>
            <h2>total</h2>
            <div>${order.totalPrice}</div>
          </div>
          <div>
            <button onClick={makePayment}>TEST ÖDEME YAP</button>
          </div>
        </div>
        {loadingDeliver && <Loader />}

        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && <button onClick={deliverOrderHandler}>Mark As Delivered</button>}
      </div>
    </>
  );
};

export default Order;
