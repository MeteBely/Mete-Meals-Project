/* eslint-disable react/prop-types */
import { useGetMealDetailsQuery } from '../slices/mealsApiSlice';
import Loader from '../pages/Loader';
import { Link } from 'react-router-dom';

const OrderItem = ({ orderItem }) => {
  const { data: firstMealOfKit, isLoading } = useGetMealDetailsQuery(orderItem.meals[0].meal);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row">
          <img className="w-40" src={firstMealOfKit.img} alt={orderItem.name} />
          <Link to={`/product/${orderItem.product}`}>{orderItem.name}</Link>
          <div>
            {orderItem.qty} x {orderItem.price} = ${orderItem.qty * orderItem.price}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderItem;
