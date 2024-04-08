import { useSelector, useDispatch } from 'react-redux';
import { useGetMealsQuery } from '../../slices/mealsApiSlice.js';
import { useCreateMembershipMutation } from '../../slices/membershipApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { useNavigate } from 'react-router-dom';
import { clearMembershipDetails } from '../../slices/membershipDetailSlice.js';
import { useState } from 'react';
import SelectMealItem from '../../components/membership/SelectMealItem.jsx';
import { toast } from 'react-toastify';

const SelectMeals = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createMembership, { isLoading }] = useCreateMembershipMutation();
  const membershipDetail = useSelector((state) => state.membershipDetail);

  const { data: twoServingFirstMeals, isLoadingOne } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'first week', preference: membershipDetail.preference });
  const { data: twoServingSecondMeals, isLoadingTwo } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'second week', preference: membershipDetail.preference });
  const { data: twoServingThirdMeals, isLoadingThree } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'third week', preference: membershipDetail.preference });
  const { data: twoServingFourthMeals, isLoadingFour } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'fourth week', preference: membershipDetail.preference });

  const [selectedFirstWeekMeals, setSelectedFirstWeekMeals] = useState([]);
  const [selectedSecondWeekMeals, setSelectedSecondWeekMeals] = useState([]);
  const [selectedThirdWeekMeals, setSelectedThirdWeekMeals] = useState([]);
  const [selectedFourthWeekMeals, setSelectedFourthWeekMeals] = useState([]);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  const submitHandler = async (e) => {
    if (selectedFirstWeekMeals && selectedSecondWeekMeals && selectedThirdWeekMeals && selectedFourthWeekMeals) {
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
      dispatch(clearMembershipDetails());
      navigate(`/membership/${res.data._id}`);
    } else {
      toast.error('Please select at least one meal for every week!');
    }
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
                <SelectMealItem key={meal._id} meal={meal} selectedXWeekMeals={selectedFirstWeekMeals} setSelectedXWeekMeals={setSelectedFirstWeekMeals} />
              ))}
            </div>
          </div>
          <div className="mb-8 border-b border-[#6B6D75] pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">Second Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start gap-20">
              {twoServingSecondMeals.map((meal) => (
                <SelectMealItem key={meal._id} meal={meal} selectedXWeekMeals={selectedSecondWeekMeals} setSelectedXWeekMeals={setSelectedSecondWeekMeals} />
              ))}
            </div>
          </div>
          <div className="mb-8 border-b border-[#6B6D75] pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">Third Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start gap-20">
              {twoServingThirdMeals.map((meal) => (
                <SelectMealItem key={meal._id} meal={meal} selectedXWeekMeals={selectedThirdWeekMeals} setSelectedXWeekMeals={setSelectedThirdWeekMeals} />
              ))}
            </div>
          </div>
          <div className="mb-8 pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">Fourth Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-start gap-20">
              {twoServingFourthMeals.map((meal) => (
                <SelectMealItem key={meal._id} meal={meal} selectedXWeekMeals={selectedFourthWeekMeals} setSelectedXWeekMeals={setSelectedFourthWeekMeals} />
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
