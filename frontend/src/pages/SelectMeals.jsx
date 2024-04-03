import { useSelector } from 'react-redux';
import { useGetMealsQuery } from '../slices/mealsApiSlice';
import Loader from './Loader';

const SelectMeals = () => {
  const membershipDetail = useSelector((state) => state.membershipDetail);

  console.log(membershipDetail);
  const { data: twoServingFirstMeals, isLoadingOne } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'March 11th' });
  const { data: twoServingSecondMeals, isLoadingTwo } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'March 18th' });
  const { data: twoServingThirdMeals, isLoadingThree } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'March 25th', preference: 'vegetarian' });
  const { data: twoServingFourthMeals, isLoadingFour } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'April 1st' });
  console.log(twoServingSecondMeals);

  return (
    <section>
      {isLoadingOne || isLoadingTwo || isLoadingThree || isLoadingFour || !twoServingFirstMeals || !twoServingSecondMeals || !twoServingThirdMeals || !twoServingFourthMeals ? (
        <Loader />
      ) : (
        <div className="mt-20">
          <div className="mb-20 border border-black">
            <h2>First Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start">
              {twoServingFirstMeals.map((meal) => (
                <div key={meal._id}>
                  <img className="w-20 h-20" src={meal.img} alt="" />
                  <h5>{meal.name}</h5>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-20 border border-black">
            <h2>Second Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start">
              {twoServingSecondMeals.map((meal) => (
                <div key={meal._id}>
                  <img className="w-20 h-20" src={meal.img} alt="" />
                  <h5>{meal.name}</h5>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-20 border border-black">
            <h2>Third Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start">
              {twoServingThirdMeals.map((meal) => (
                <div key={meal._id}>
                  <img className="w-20 h-20" src={meal.img} alt="" />
                  <h5>{meal.name}</h5>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-20 border border-black">
            <h2>Fourth Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start">
              {twoServingFourthMeals.map((meal) => (
                <div key={meal._id}>
                  <img className="w-20 h-20" src={meal.img} alt="" />
                  <h5>{meal.name}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectMeals;
