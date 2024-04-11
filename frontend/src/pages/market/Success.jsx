import { useEffect, useState } from 'react';
import { useUpdateOrderToPaidMutation } from '../../slices/ordersApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import Warning from '../../components/common/Warning.jsx';
import { useParams } from 'react-router-dom';
import OrderItem from '../../components/market/OrderItem.jsx';

const Success = () => {
  const { id: orderId } = useParams();
  const [updateOrderToPaid, { isLoading: updatingOrder }] = useUpdateOrderToPaidMutation();
  const [order, setOrder] = useState();

  //Kullanıcı başarılı ödeme yaparak bu sayfaya geldiği için order'inin isPaid'ini true yapıyoruz.
  useEffect(() => {
    const updateOrder = async () => {
      const res = await updateOrderToPaid(orderId);
      setOrder(res);
    };
    updateOrder();
  }, [orderId, updateOrderToPaid]);

  return (
    <div className="mt-20 m-auto min-[850px]:w-[800px] w-auto">
      {updatingOrder || !order || !order.data ? (
        <Loader />
      ) : (
        <section className="px-2">
          <h1 className="text-[32px] tracking-wide text-green-500 fontCera font-semibold mb-6">Payment successful</h1>
          <div className="min-[850px]:w-auto w-[400px] mx-auto">
            <Warning message={`Thank you for your payment! Your order id: ${orderId}`} />
          </div>
          <div className="flex flex-col gap-2 fontCera items-start justify-center">
            <div className="flex flex-row">
              <h4 className="text-[#728285] font-semibold text-[15px] mr-1">Name:</h4>
              <span className="">{order.data.user.name}</span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <h4 className="text-[#728285] font-semibold text-[15px] mr-1">Email:</h4>
              <span className="">{order.data.user.email}</span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <h4 className="text-[#728285] font-semibold text-[15px] mr-1">Address:</h4>
              <span className="">
                {order.data.shippingAddress.address}, {order.data.shippingAddress.city}, {order.data.shippingAddress.postalCode},
              </span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <h4 className="text-[#728285] font-semibold text-[15px] mr-1">Amount:</h4>
              <span className="">${order.data.totalPrice}</span>
            </div>
            <div className="fontCera">
              <h2 className="text-[18px] tracking-wide text-[#728285] font-semibold mb-2">Order Items:</h2>
              {order.data.orderItems.map((item) => {
                return <OrderItem orderItem={item} key={item._id} />;
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Success;
