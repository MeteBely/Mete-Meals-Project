/* eslint-disable react/prop-types */
import Loader from '../common/Loader.jsx';
import { useGetMealDetailsQuery } from '../../slices/mealsApiSlice.js';

const UpdateMealKitMeals = ({ mealId, additionableMealsContainer, setAdditionableMealsContainer, setMeals, meals }) => {
  const { data: meal, isLoading } = useGetMealDetailsQuery(mealId);
  const handleClick = (e, selectedMeal) => {
    e.preventDefault();
    let newArray = [];
    newArray = meals.filter((inBoxMeal) => inBoxMeal.meal._id !== selectedMeal._id);
    setMeals(newArray);
    setAdditionableMealsContainer([...additionableMealsContainer, meal]);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-40">
          <button onClick={(e) => handleClick(e, meal)}>
            <img className="w-40 h-40" src={meal.img} alt="" />
            <p className="fontCera w-40">{meal.name}</p>
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateMealKitMeals;
