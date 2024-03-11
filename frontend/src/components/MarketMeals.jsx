/* eslint-disable react/prop-types */
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
const MarketMeals = ({ mealKit }) => {
  const [mealImg, setMealImg] = useState('');
  useEffect(() => {
    const fetchSingleMail = async () => {
      const { data } = await axios.get(`/api/meals/${mealKit.meals[0].meal}`);
      setMealImg(data.img);
    };

    fetchSingleMail();
  }, [mealKit.meals]);
  return (
    <div className="fontCera w-[282px] mb-[20px] h-[394px]">
      <Link to={`/market/mealKit/${mealKit._id}`}>
        <img src={mealImg} className="cursor-pointer" />
      </Link>
      <Link to={`/market/mealKit/${mealKit._id}`} className="font-semibold text-[#303236] inline-block mt-4 hover:underline cursor-pointer">
        {mealKit.name}
      </Link>
      <p className="text-[#6a6d75] text-[15px] leading-[18px]">{mealKit.subTxt}</p>
      <span className="text-[#303236] inline-block mt-[12px]">${mealKit.price}</span>
    </div>
  );
};

export default MarketMeals;
