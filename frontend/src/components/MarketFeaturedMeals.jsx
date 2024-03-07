// import FeaturedMeals from '../data/FeaturedMeals';
import MarketMeals from '../components/MarketMeals';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MarketFeaturedMeals = () => {
  const [mealKits, setMealKits] = useState([]);
  useEffect(() => {
    const fetchMealKits = async () => {
      const { data } = await axios('/api/mealKits');
      setMealKits(data);
    };

    fetchMealKits();
  }, []);

  return (
    <section>
      <div className="w-[62%] m-auto">
        <h3 className="text-[22px] mb-[24px] fontCera font-semibold text-[#303236] w-fit m-auto">Featured</h3>
        <div className="flex flex-row justify-center items-center flex-wrap gap-4 ">
          {mealKits.map((mealKit, index) => {
            return <MarketMeals mealKit={mealKit} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default MarketFeaturedMeals;
