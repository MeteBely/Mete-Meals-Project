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
        <div className="flex flex-row">
          <img className="w-40" src={firstMealOfKit.img} alt={cartItem.name} />
          <Link to={`/meal/${cartItem._id}`}>{cartItem.name}</Link>
          <div>
            {cartItem.qty} x {cartItem.price} = {cartItem.qty * cartItem.price}
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrderItems;
