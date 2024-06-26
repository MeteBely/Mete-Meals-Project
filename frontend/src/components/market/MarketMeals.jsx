/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
const MarketMeals = ({ mealKit }) => {
  return (
    <>
      <div className="fontCera w-[282px] mb-[20px] h-[394px]">
        <Link to={`/market/mealKit/${mealKit._id}`}>
          <img src={mealKit.meals[0] ? mealKit.meals[0].meal.img : 'https://png.pngtree.com/png-vector/20211025/ourmid/pngtree-stamp-set-red-example-rectangle-png-image_4003403.png'} className="cursor-pointer" />
        </Link>
        <Link to={`/market/mealKit/${mealKit._id}`} className="font-semibold text-[#303236] inline-block mt-4 hover:underline cursor-pointer">
          {mealKit.name}
        </Link>
        <p className="text-[#6a6d75] text-[15px] leading-[18px]">{mealKit.subTxt}</p>
        <span className="text-[#303236] inline-block mt-[12px]">${mealKit.price}</span>
      </div>
    </>
  );
};

export default MarketMeals;
