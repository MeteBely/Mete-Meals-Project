/* eslint-disable react/prop-types */
import Loader from '../pages/Loader';
import { useGetMealDetailsQuery } from '../slices/mealsApiSlice';

const UpdateMealKitMeals = ({ mealId, additionableMealsContainer, setAdditionableMealsContainer, setMeals, meals }) => {
  const { data: meal, isLoading } = useGetMealDetailsQuery(mealId);
  const handleClick = (e, selectedMeal) => {
    e.preventDefault();
    let newArray = [];
    newArray = meals.filter((inBoxMeal) => inBoxMeal.meal !== selectedMeal._id);
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
            <img src={meal.img} alt="" />
            <p>{meal.name}</p>
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateMealKitMeals;
