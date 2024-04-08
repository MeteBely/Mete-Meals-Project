/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import tick from '../../assets/icons/tick.png';

const SelectMealItem = ({ meal, selectedXWeekMeals, setSelectedXWeekMeals }) => {
  const [isMealInPlan, setIsMealInPlan] = useState(false);

  const clickHandler = (mealId, selectedXWeekMeals, setSelectedXWeekMeals) => {
    let testArray = selectedXWeekMeals.slice(); // [...selectedFirstWeekMeals]'de olur;
    let isExist = false;
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i] === mealId) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      testArray = testArray.filter((existMealId) => existMealId !== mealId);
      setIsMealInPlan(false);
    } else {
      testArray.push(mealId);
      setIsMealInPlan(true);
    }

    setSelectedXWeekMeals(testArray);
  };

  return (
    <div key={meal._id} className="flex flex-col items-center justify-center gap-2  w-[300px] relative">
      <img onClick={() => clickHandler(meal._id, selectedXWeekMeals, setSelectedXWeekMeals)} className="w-32 h-32 rounded-md cursor-pointer" src={meal.img} alt="" />
      <img src={tick} className={`${isMealInPlan ? 'absolute top-1/4 right-[40px] inline-block w-[30px] h-[30px]' : 'hidden'}`}></img>
      <Link to={`/on-the-menu/meal/${meal._id}`} className="underline underline-offset-2">
        {meal.name}
      </Link>
    </div>
  );
};

export default SelectMealItem;
