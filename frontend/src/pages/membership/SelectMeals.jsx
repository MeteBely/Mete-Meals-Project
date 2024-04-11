import { useSelector, useDispatch } from 'react-redux';
import { useGetMealsQuery } from '../../slices/mealsApiSlice.js';
import { useCreateMembershipMutation } from '../../slices/membershipApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { useNavigate } from 'react-router-dom';
import { clearMembershipDetails } from '../../slices/membershipDetailSlice.js';
import { useState } from 'react';
import SelectMealItem from '../../components/membership/SelectMealItem.jsx';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { addressSchema } from '../../schemas/index.js';
import CustomInput from '../../components/form-components/CustomInput.jsx';

const SelectMeals = () => {
  const membershipDetail = useSelector((state) => state.membershipDetail);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { data: twoServingFirstMeals, isLoadingOne } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'first week', preference: membershipDetail.preference });
  const { data: twoServingSecondMeals, isLoadingTwo } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'second week', preference: membershipDetail.preference });
  const { data: twoServingThirdMeals, isLoadingThree } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'third week', preference: membershipDetail.preference });
  const { data: twoServingFourthMeals, isLoadingFour } = useGetMealsQuery({ numberOfServing: membershipDetail.plan.numberOfServing, date: 'fourth week', preference: membershipDetail.preference });
  const [createMembership, { isLoading }] = useCreateMembershipMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFirstWeekMeals, setSelectedFirstWeekMeals] = useState([]);
  const [selectedSecondWeekMeals, setSelectedSecondWeekMeals] = useState([]);
  const [selectedThirdWeekMeals, setSelectedThirdWeekMeals] = useState([]);
  const [selectedFourthWeekMeals, setSelectedFourthWeekMeals] = useState([]);

  //Kullanıcının her haftada minimum 1 meal seçtiğinden emin olunur. Seçtiği mealler, yazdığı adres ve localdeki plan ve preference bilgilileri ile membership oluşturulur.
  //Ayrıca localden membership bilgileri temizlenir ve son olarak kullanıcı membership sayfasına yönlendirilir.
  const onSubmit = async (values, actions) => {
    if (selectedFirstWeekMeals && selectedFirstWeekMeals.length > 0 && selectedSecondWeekMeals && selectedSecondWeekMeals.length > 0 && selectedThirdWeekMeals && selectedThirdWeekMeals.length > 0 && selectedFourthWeekMeals && selectedFourthWeekMeals.length > 0) {
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
        shippingAddress: values,
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
            <div className="flex flex-row flex-wrap items-center justify-center min-[1600px]:justify-start gap-20">
              {twoServingFirstMeals.map((meal) => (
                <SelectMealItem key={meal._id} meal={meal} selectedXWeekMeals={selectedFirstWeekMeals} setSelectedXWeekMeals={setSelectedFirstWeekMeals} />
              ))}
            </div>
          </div>
          <div className="mb-8 border-b border-[#6B6D75] pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">Second Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-center min-[1600px]:justify-start gap-20">
              {twoServingSecondMeals.map((meal) => (
                <SelectMealItem key={meal._id} meal={meal} selectedXWeekMeals={selectedSecondWeekMeals} setSelectedXWeekMeals={setSelectedSecondWeekMeals} />
              ))}
            </div>
          </div>
          <div className="mb-8 border-b border-[#6B6D75] pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">Third Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-center min-[1600px]:justify-start gap-20">
              {twoServingThirdMeals.map((meal) => (
                <SelectMealItem key={meal._id} meal={meal} selectedXWeekMeals={selectedThirdWeekMeals} setSelectedXWeekMeals={setSelectedThirdWeekMeals} />
              ))}
            </div>
          </div>
          <div className="mb-8 pb-8">
            <h2 className="text-[36px] tracking-wide text-[#0F346C] fontCera font-semibold mb-4 ml-[45px]">Fourth Week</h2>
            <div className="flex flex-row flex-wrap items-center justify-center min-[1600px]:justify-start gap-20">
              {twoServingFourthMeals.map((meal) => (
                <SelectMealItem key={meal._id} meal={meal} selectedXWeekMeals={selectedFourthWeekMeals} setSelectedXWeekMeals={setSelectedFourthWeekMeals} />
              ))}
            </div>
          </div>
        </div>
      )}
      <Formik initialValues={{ address: shippingAddress?.address || '', city: shippingAddress?.city || '', postalCode: shippingAddress?.postalCode || '' }} onSubmit={onSubmit} validationSchema={addressSchema}>
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap-4 border rounded-none shadow-lg p-4 m-4 min-[1050px]:w-[1000px] w-auto">
            <h1 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold mb-6">Location</h1>
            <CustomInput label="Address" name="address" />
            <CustomInput label="City" name="city" />
            <CustomInput label="Postal Code" name="postalCode" />
            <button type="submit" disabled={isLoading} className="text-[16px] w-[200px] rounded-md h-[40px] fontCera tracking-wide bg-[#235091] hover:bg-[#0F346C] text-[#fff]">
              Continue
            </button>
            {isLoading && <Loader />}
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SelectMeals;
