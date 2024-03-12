/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useGetMealDetailsQuery } from '../slices/mealsApiSlice';
import Loader from '../pages/Loader';
const MarketMeals = ({ mealKit }) => {
  const { data: firstMealOfKit, isLoading } = useGetMealDetailsQuery(mealKit.meals[0].meal);
  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="fontCera w-[282px] mb-[20px] h-[394px]">
          <Link to={`/market/mealKit/${mealKit._id}`}>
            <img src={firstMealOfKit.img} className="cursor-pointer" />
          </Link>
          <Link to={`/market/mealKit/${mealKit._id}`} className="font-semibold text-[#303236] inline-block mt-4 hover:underline cursor-pointer">
            {mealKit.name}
          </Link>
          <p className="text-[#6a6d75] text-[15px] leading-[18px]">{mealKit.subTxt}</p>
          <span className="text-[#303236] inline-block mt-[12px]">${mealKit.price}</span>
        </div>
      )}
    </>
  );
};

export default MarketMeals;
