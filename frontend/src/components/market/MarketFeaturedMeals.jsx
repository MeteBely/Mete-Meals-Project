import MarketMeals from './MarketMeals.jsx';
import { useGetMealKitsQuery } from '../../slices/mealKitsApiSlice.js';
import Loader from '../common/Loader.jsx';

const MarketFeaturedMeals = () => {
  const { data: mealKits, isLoading } = useGetMealKitsQuery();
  console.log(mealKits);
  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
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
      )}
    </>
  );
};

export default MarketFeaturedMeals;
