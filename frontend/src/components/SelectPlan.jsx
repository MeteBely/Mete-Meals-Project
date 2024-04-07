import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePlan } from '../slices/membershipDetailSlice.js';
import { loadStripe } from '@stripe/stripe-js';
import { useGetStripePublishableKeyQuery, usePayMembershipMutation } from '../slices/membershipApiSlice.js';

const SelectPlan = () => {
  const dispatch = useDispatch();
  const { data: stripeId, isLoading: loadingStripeId } = useGetStripePublishableKeyQuery();
  const [payMembership, { isLoading: loadingPay }] = usePayMembershipMutation();
  //Bu 4 değişkenide localde tutacağım.
  const [activeMealPerWeek, setActiveMealPerWeek] = useState('twoMeal');
  const [activeNumberOfServing, setActiveNumberOfServing] = useState('twoServing');
  const [pricePerServing, setPricePerServing] = useState(18);
  const [subTotal, setSubTotal] = useState(0);

  const mealsPerWeekAfterHandling = () => {
    if (activeMealPerWeek === 'twoMeal') {
      return 'after:absolute after:top-0 after:left-0 after:w-1/4 after:h-full after:bg-[#002684] after:tracking-[2px] after:whitespace-nowrap after:text-[22px] rounded-sm after:text-center after:fontCera after:text-white after:pt-[2px] after:content-["2"] after:transition-[left] after:duration-150 after:ease-linear';
    } else if (activeMealPerWeek === 'threeMeal') {
      return 'after:absolute after:top-0 after:left-1/4 after:w-1/4 after:h-full after:bg-[#002684] after:tracking-[2px] after:whitespace-nowrap after:text-[22px]  rounded-sm after:text-center after:fontCera after:text-white after:pt-[2px] after:content-["3"] after:transition-[left] after:duration-150 after:ease-linear';
    } else if (activeMealPerWeek === 'fourMeal') {
      return 'after:absolute after:top-0 after:left-2/4 after:w-1/4 after:h-full after:bg-[#002684] after:tracking-[2px] after:whitespace-nowrap after:text-[22px] rounded-sm after:text-center after:fontCera after:text-white after:pt-[2px] after:content-["4"] after:transition-[left] after:duration-150 after:ease-linear';
    } else if (activeMealPerWeek === 'fiveMeal') {
      return 'after:absolute after:top-0 after:left-3/4 after:w-1/4 after:h-full after:bg-[#002684] after:tracking-[2px] after:whitespace-nowrap after:text-[22px] rounded-sm after:text-center after:fontCera after:text-white after:pt-[2px] after:content-["5"] after:transition-[left] after:duration-150 after:ease-linear';
    }
  };

  useEffect(() => {
    if (activeMealPerWeek === 'twoMeal') {
      setPricePerServing(18.5);
      activeNumberOfServing === 'twoServing' ? setSubTotal(pricePerServing * 2 * 2) : setSubTotal(pricePerServing * 2 * 4);
    } else if (activeMealPerWeek === 'threeMeal') {
      setPricePerServing(16.25);
      activeNumberOfServing === 'twoServing' ? setSubTotal(pricePerServing * 3 * 2) : setSubTotal(pricePerServing * 3 * 4);
    } else if (activeMealPerWeek === 'fourMeal') {
      setPricePerServing(14.15);
      activeNumberOfServing === 'twoServing' ? setSubTotal(pricePerServing * 4 * 2) : setSubTotal(pricePerServing * 4 * 4);
    } else if (activeMealPerWeek === 'fiveMeal') {
      setPricePerServing(12.05);
      activeNumberOfServing === 'twoServing' ? setSubTotal(pricePerServing * 5 * 2) : setSubTotal(pricePerServing * 5 * 4);
    }
  }, [activeNumberOfServing, activeMealPerWeek, pricePerServing]);

  const submitHandler = async () => {
    dispatch(
      savePlan({
        numberOfServing: activeNumberOfServing === 'twoServing' ? '2' : '4',
        mealsPerWeek: activeMealPerWeek,
        pricePerServing,
        subTotal,
      })
    );
    const stripe = await loadStripe(stripeId);
    const res = await payMembership({
      subTotal,
    });
    const result = stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="colTwoDiv flex flex-col justify-center items-center mt-10 gap-8 min-[1100px]:border-l-[1px] border-[#d3d6cd] pl-[70px] h-5/6  min-[1100px]:pb-16  min-[1100px]:pr-12">
      <h2 className="text-[22px] font-semibold text-[#303236]">2. Select your plan</h2>
      <div className="flex flex-row gap-[40px]">
        <p className="text-[18px] text-[#303235] text-center">Servings per meal</p>
        <ul className={`relative flex flex-row ${activeNumberOfServing === 'twoServing' ? 'after:absolute after:top-0 after:left-0 after:w-1/2 after:h-full after:bg-[#002684] after:whitespace-nowrap after:text-[22px] rounded-sm after:text-white after:fontCera  after:text-center after:pt-[2px] after:content-["2"] after:transition-[left] after:duration-100 after:ease-linear' : 'after:absolute after:top-0 after:left-1/2 after:w-1/2 after:h-full after:bg-[#002684] after:whitespace-nowrap after:text-[22px] rounded-sm after:text-white after:fontCera after:text-center after:pt-[2px] after:content-["4"] after:transition-[left] after:duration-100 after:ease-linear'}`}>
          <li>
            <button className="border border-[#d3d6cd] w-[100px] h-[38px] text-[#002684] text-[22px] rounded-sm" onClick={() => setActiveNumberOfServing('twoServing')}>
              2
            </button>
          </li>
          <li>
            <button className="border border-[#d3d6cd] w-[100px] h-[38px] text-[#002684] text-[22px]" onClick={() => setActiveNumberOfServing('fourServing')}>
              4
            </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-row gap-[60px]">
        <p className="text-[18px] text-[#303235] text-center">Meals per week</p>
        <ul className={`relative flex flex-row ${mealsPerWeekAfterHandling()}`}>
          <li>
            <button className="border border-[#d3d6cd] w-[50px] h-[38px] text-[#002684] text-[22px] rounded-sm" onClick={() => setActiveMealPerWeek('twoMeal')}>
              2
            </button>
          </li>
          <li>
            <button className="border border-[#d3d6cd] w-[50px] h-[38px] text-[#002684] text-[22px] rounded-sm" onClick={() => setActiveMealPerWeek('threeMeal')}>
              3
            </button>
          </li>
          <li>
            <button className="border border-[#d3d6cd] w-[50px] h-[38px] text-[#002684] text-[22px] rounded-sm" onClick={() => setActiveMealPerWeek('fourMeal')}>
              4
            </button>
          </li>
          <li>
            <button className="border border-[#d3d6cd] w-[50px] h-[38px] text-[#002684] text-[22px] rounded-sm" onClick={() => setActiveMealPerWeek('fiveMeal')}>
              5
            </button>
          </li>
        </ul>
      </div>
      <div className="bg-[#F8F9FA] w-full h-[150px] p-4 rounded-[12px]">
        <p className="text-[18px]">Order Summary</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-[#696d75]">Price per serving</p>
            <p className="text-[#696d75]">Shipping</p>
            <p className="mt-4">First order subtotal</p>
          </div>
          <div className="flex flex-col">
            <span className="text-right text-[#1eb389] font-semibold">${pricePerServing.toFixed(2)}</span>
            <span className="font-semibold text-right text-[#1eb389]">FREE</span>
            <span className="mt-3 text-right text-[#303235] text-[20px]">${subTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div>
        <button onClick={submitHandler} className="bg-[#00a0df] text-white tracking-[2px] text-[13px] w-[150px] h-[40px] rounded-[20px] hover:bg-[#5CBFE6]">
          CONTINUE
        </button>
      </div>
      <div>
        <p className="text-[15px] text-[#6a6d75]">
          You can update your preferences <br />
          and skip, pause, or cancel at any time.
        </p>
      </div>
    </div>
  );
};

export default SelectPlan;
