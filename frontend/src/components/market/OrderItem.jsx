/* eslint-disable react/prop-types */
import { useGetMealDetailsQuery } from '../../slices/mealsApiSlice.js';
import Loader from '../common/Loader.jsx';
import { Link } from 'react-router-dom';

const OrderItem = ({ orderItem }) => {
  const { data: firstMealOfKit, isLoading } = useGetMealDetailsQuery(orderItem.meals[0].meal._id);
  console.log(orderItem);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row items-center justify-between w-[600px] mb-2">
          <div className="flex flex-row items-center justify-start">
            <img className="w-20 rounded-md mr-4" src={firstMealOfKit.img} alt={orderItem.name} />
            <Link className="fontCera underline" to={`/market/mealKit/${orderItem.mealKit}`}>
              {orderItem.name}
            </Link>
          </div>
          <div className="fontCera">
            {orderItem.qty} x ${orderItem.price} = ${orderItem.qty * orderItem.price}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderItem;
