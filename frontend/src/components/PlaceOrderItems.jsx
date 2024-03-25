/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useGetMealDetailsQuery } from '../slices/mealsApiSlice';
import Loader from '../pages/Loader';

const PlaceOrderItems = ({ cartItem }) => {
  const { data: firstMealOfKit, isLoading } = useGetMealDetailsQuery(cartItem.meals[0].meal);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row items-center justify-between w-[500px] mb-2">
          <div className="flex flex-row items-center justify-start">
            <img className="w-20 rounded-md mr-4" src={firstMealOfKit.img} alt={cartItem.name} />
            <Link className="fontCera underline" to={`/market/mealKit/${cartItem._id}`}>
              {cartItem.name}
            </Link>
          </div>
          <div className="fontCera">
            {cartItem.qty} x ${cartItem.price} = ${cartItem.qty * cartItem.price}
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrderItems;
