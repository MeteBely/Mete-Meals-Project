import { useSelector } from 'react-redux';
import { useGetMealsQuery } from '../slices/mealsApiSlice';
import { useCreateMembershipMutation } from '../slices/membershipApiSlice';
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SelectMeals = () => {
  const navigate = useNavigate();
  const [createMembership, { isLoading }] = useCreateMembershipMutation();
  const membershipDetail = useSelector((state) => state.membershipDetail);

  const { data: twoServingFirstMeals, isLoadingOne } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'March 11th', preference: membershipDetail.preference });
  const { data: twoServingSecondMeals, isLoadingTwo } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'March 18th', preference: membershipDetail.preference });
  const { data: twoServingThirdMeals, isLoadingThree } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'March 25th', preference: membershipDetail.preference });
  const { data: twoServingFourthMeals, isLoadingFour } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'April 1st', preference: membershipDetail.preference });

  const [selectedFirstWeekMeals, setSelectedFirstWeekMeals] = useState([]);
  const [selectedSecondWeekMeals, setSelectedSecondWeekMeals] = useState([]);
  const [selectedThirdWeekMeals, setSelectedThirdWeekMeals] = useState([]);
  const [selectedFourthWeekMeals, setSelectedFourthWeekMeals] = useState([]);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  const clickHandler = (mealId, selectedXWeekMeals, setSelectedXWeekMeals) => {
    let testArray = selectedXWeekMeals.slice(); // veya [...selectedFirstWeekMeals];
    let isExist = false;
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i] === mealId) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      testArray = testArray.filter((existMealId) => existMealId !== mealId);
    } else {
      testArray.push(mealId);
    }

    setSelectedXWeekMeals(testArray);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await createMembership({
      plan: {
        numberOfServing: membershipDetail.plan.numberOfServing,
        mealsPerWeek: membershipDetail.plan.mealsPerWeek,
        pricePerServing: membershipDetail.plan.pricePerServing,
        subTotal: membershipDetail.plan.subTotal,
        selectedMeals: {
          firstWeek: selectedFirstWeekMeals,
          secondWeek: selectedSecondWeekMeals,
          thirdWeek: selectedThirdWeekMeals,
          fourthWeek: selectedFourthWeekMeals,
        },
      },
      preference: membershipDetail.preference,
      shippingAddress: {
        address,
        city,
        postalCode,
      },
    });
    navigate(`/membership/${res.data._id}`);
  };

  return (
    <section>
      {isLoadingOne || isLoadingTwo || isLoadingThree || isLoadingFour || !twoServingFirstMeals || !twoServingSecondMeals || !twoServingThirdMeals || !twoServingFourthMeals ? (
        <Loader />
      ) : (
        <div className="mt-20 fontCera px-2">
          <div className="mb-8 border-b border-[#6B6D75] pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">First Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start gap-20">
              {twoServingFirstMeals.map((meal) => (
                <div key={meal._id} className="flex flex-col items-center justify-center gap-2 w-[300px]">
                  <img onClick={() => clickHandler(meal._id, selectedFirstWeekMeals, setSelectedFirstWeekMeals)} className="w-32 h-32 rounded-md cursor-pointer" src={meal.img} alt="" />
                  <Link to={`/on-the-menu/meal/${meal._id}`} className="underline underline-offset-2">
                    {meal.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8 border-b border-[#6B6D75] pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">Second Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start gap-20">
              {twoServingSecondMeals.map((meal) => (
                <div key={meal._id} className="flex flex-col items-center justify-center gap-2  w-[300px]">
                  <img onClick={() => clickHandler(meal._id, selectedSecondWeekMeals, setSelectedSecondWeekMeals)} className="w-32 h-32 rounded-md cursor-pointer" src={meal.img} alt="" />
                  <Link to={`/on-the-menu/meal/${meal._id}`} className="underline underline-offset-2">
                    {meal.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8 border-b border-[#6B6D75] pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">Third Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start gap-20">
              {twoServingThirdMeals.map((meal) => (
                <div key={meal._id} className="flex flex-col items-center justify-center gap-2 w-[300px]">
                  <img onClick={() => clickHandler(meal._id, selectedThirdWeekMeals, setSelectedThirdWeekMeals)} className="w-32 h-32 rounded-md cursor-pointer" src={meal.img} alt="" />
                  <Link to={`/on-the-menu/meal/${meal._id}`} className="underline underline-offset-2">
                    {meal.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8 pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">Fourth Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start gap-20">
              {twoServingFourthMeals.map((meal) => (
                <div key={meal._id} className="flex flex-col items-center justify-center gap-2 w-[300px]">
                  <img onClick={() => clickHandler(meal._id, selectedFourthWeekMeals, setSelectedFourthWeekMeals)} className="w-32 h-32 rounded-md cursor-pointer" src={meal.img} alt="" />
                  <Link to={`/on-the-menu/meal/${meal._id}`} className="underline underline-offset-2">
                    {meal.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <form action="" onSubmit={(e) => submitHandler(e)} className="my-8">
        <h1 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold mb-6">Location</h1>
        <div className="mb-4 flex flex-col items-start justify-center">
          <label className="text-[18px] font-semibold  text-[#6B6D75]" htmlFor="address">
            Address
          </label>
          <input className="border border-[#06316C] h-[40px] w-[600px] rounded-md placeholder:text-[#728285] pl-2 focus:outline-[#06316C]" type="address" name="" id="address" placeholder="Type address..." value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="mb-4 flex flex-col items-start justify-center">
          <label className=" text-[18px] font-semibold  text-[#6B6D75]" htmlFor="city">
            City
          </label>
          <input className="border border-[#06316C] h-[40px] w-[600px] rounded-md placeholder:text-[#728285] pl-2 focus:outline-[#06316C]" type="city" name="" id="city" placeholder="Type city..." value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="mb-4 flex flex-col items-start justify-center">
          <label className="text-[18px] font-semibold  text-[#6B6D75]" htmlFor="postalCode">
            Postal Code
          </label>
          <input className="border border-[#06316C] h-[40px] w-[600px] rounded-md placeholder:text-[#728285] pl-2 focus:outline-[#06316C]" type="postalCode" name="" id="postalCode" placeholder="Type postal code..." value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div>
          <button type="submit" className="text-[16px] w-[200px] rounded-md h-[40px] fontCera tracking-wide bg-[#235091] hover:bg-[#0F346C] text-[#fff]">
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default SelectMeals;
