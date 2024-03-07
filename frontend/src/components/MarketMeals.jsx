/* eslint-disable react/prop-types */
import axios from 'axios';
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
      <img src={mealImg} />
      <a href="" className="font-semibold text-[#303236] inline-block mt-4 hover:underline">
        {mealKit.name}
      </a>
      <p className="text-[#6a6d75] text-[15px] leading-[18px]">{mealKit.subTxt}</p>
      <span className="text-[#303236] inline-block mt-[12px]">${mealKit.price}</span>
    </div>
  );
};

export default MarketMeals;
