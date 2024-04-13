import { useEffect } from 'react';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();

  //orders değişirse refectch ediyoruz güncel verileri alabilmek adına.
  useEffect(() => {
    refetch();
  }, [orders, refetch]);

  return (
    <section>
      <div className="mt-20 px-2">
        <h1 className="text-[34px] tracking-wide text-[#0F346C] fontCera font-semibold mb-2">Orders</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 fontCera">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center hidden min-[1015px]:table-cell">
                  ID
                </th>
                <th scope="col" className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6 text-center">
                  USER
                </th>
                <th scope="col" className="px-6 py-3 hidden min-[785px]:table-cell text-center">
                  DATE
                </th>
                <th scope="col" className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6 text-center">
                  TOTAL
                </th>
                <th scope="col" className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6 text-center">
                  PAID
                </th>
                <th scope="col" className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6 text-center">
                  DELIVERED
                </th>
                <th scope="col" className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 hidden min-[1015px]:table-cell text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{order._id}</td>
                  <td className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{order.user && order.user.name}</td>
                  <td className="px-6 py-4 text-center hidden min-[785px]:table-cell">{order.createdAt.substring(0, 10)}</td>
                  <td className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6 text-center">${order.totalPrice}</td>
                  <td className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6 text-center">{order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                  <td className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6 text-center">{order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                  <td className="px-1 py-3 min-[525px]:px-3 min-[650px]:px-6">
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default OrderList;
