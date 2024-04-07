import { Link, useParams } from 'react-router-dom';
import { useGetUserMembershipQuery, useUpdateMembershipMealsDeliverMutation } from '../../slices/membershipApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Membership = () => {
  const { id: membershipId } = useParams();
  const { data: userMembership, isLoading, refetch } = useGetUserMembershipQuery(membershipId);
  const [updateMealsDeliverSituation] = useUpdateMembershipMealsDeliverMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleDeliver = async (membershipId) => {
    try {
      await updateMealsDeliverSituation(membershipId);
      toast.success("Membership meal's Week is successfully update to mark as delivered!");
      refetch();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="mt-20 px-2 fontCera pb-4">
          <div className="flex flex-row items-start gap-10">
            <div className=" w-3/4">
              <h1 className="text-[34px] tracking-wide text-[#0F346C] fontCera font-semibold mb-6">Membership Details</h1>
              <div className="mb-2 border-b border-[#6B6D75] pb-2">
                <h2 className="text-[20px] tracking-wide text-[#0F346C] fontCera font-semibold ml-[65px]">First Week</h2>
                <div className="flex flex-row flex-wrap items-center justify-start gap-2">
                  {userMembership.plan.selectedMeals.firstWeek.map((firstWeekMeal) => (
                    <div key={firstWeekMeal._id} className="flex flex-col items-center justify-center gap-1 w-[300px]">
                      <img className="w-16 h-16 rounded-md" src={firstWeekMeal.img} alt="" />
                      <Link to={`/on-the-menu/meal/${firstWeekMeal._id}`} className="underline underline-offset-2 text-[14px]">
                        {firstWeekMeal.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-2 border-b border-[#6B6D75] pb-2">
                <h2 className="text-[20px] tracking-wide text-[#0F346C] fontCera font-semibold ml-[65px]">Second Week</h2>
                <div className="flex flex-row flex-wrap items-center justify-start gap-2">
                  {userMembership.plan.selectedMeals.secondWeek.map((secondWeek) => (
                    <div key={secondWeek._id} className="flex flex-col items-center justify-center gap-1 w-[300px]">
                      <img className="w-16 h-16 rounded-md" src={secondWeek.img} alt="" />
                      <Link to={`/on-the-menu/meal/${secondWeek._id}`} className="underline underline-offset-2 text-[14px]">
                        {secondWeek.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-2 border-b border-[#6B6D75] pb-2">
                <h2 className="text-[20px] tracking-wide text-[#0F346C] fontCera font-semibold ml-[65px]">Third Week</h2>
                <div className="flex flex-row flex-wrap items-center justify-start gap-2">
                  {userMembership.plan.selectedMeals.thirdWeek.map((thirdWeek) => (
                    <div key={thirdWeek._id} className="flex flex-col items-center justify-center gap-1 w-[300px]">
                      <img className="w-16 h-16 rounded-md" src={thirdWeek.img} alt="" />
                      <Link to={`/on-the-menu/meal/${thirdWeek._id}`} className="underline underline-offset-2 text-[14px]">
                        {thirdWeek.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <h2 className="text-[20px] tracking-wide text-[#0F346C] fontCera font-semibold ml-[65px]">Fourth Week</h2>
                <div className="flex flex-row flex-wrap items-center justify-start gap-2">
                  {userMembership.plan.selectedMeals.fourthWeek.map((fourthWeek) => (
                    <div key={fourthWeek._id} className="flex flex-col items-center justify-center gap-1 w-[300px]">
                      <img className="w-16 h-16 rounded-md" src={fourthWeek.img} alt="" />
                      <Link to={`/on-the-menu/meal/${fourthWeek._id}`} className="underline underline-offset-2 text-[14px]">
                        {fourthWeek.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className=" w-1/4">
              <div className="mb-4">
                <h2 className="text-[30px] tracking-wide text-[#0F346C] fontCera font-semibold">Shipping</h2>
                <p className="fontCera">
                  <strong className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Address:</strong>
                  {userMembership.shippingAddress.address}, {userMembership.shippingAddress.city}, {userMembership.shippingAddress.postalCode}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-[30px] tracking-wide text-[#0F346C] fontCera font-semibold">User</h2>
                <ul className="fontCera">
                  <li>
                    <span className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Name:</span> {userMembership.user.name}
                  </li>

                  <li>
                    <span className="text-[18px] font-semibold  text-[#6B6D75] mr-2">Email:</span>
                    {userMembership.user.email}
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h2 className="text-[30px] tracking-wide text-[#0F346C] fontCera font-semibold">Plan</h2>
                <ul className="fontCera">
                  <li>
                    <span className=" font-semibold  text-[#6B6D75] mr-1">Preference:</span>
                    {userMembership.preference.charAt(0).toUpperCase() + userMembership.preference.slice(1)}
                  </li>
                  <li>
                    <span className="font-semibold  text-[#6B6D75] mr-1">Meals Per Week:</span>
                    {userMembership.plan.mealsPerWeek}
                  </li>
                  <li>
                    <span className="font-semibold  text-[#6B6D75] mr-1">Number Of Serving:</span>
                    {userMembership.plan.numberOfServing}
                  </li>
                  <li>
                    <span className="font-semibold  text-[#6B6D75] mr-1">Price Per Serving:</span>${userMembership.plan.pricePerServing}
                  </li>
                  <li>
                    <span className="font-semibold  text-[#6B6D75] mr-1">Total Price:</span>${userMembership.plan.subTotal}
                  </li>
                  <li>
                    <span className="font-semibold  text-[#6B6D75] mr-1">Starting at:</span>
                    {userMembership.createdAt.substring(0, 10)}
                  </li>
                </ul>
              </div>
              {/* {loadingUpdateDelivered && <Loader />} */}
              {userInfo.isAdmin && !userMembership.isDelivered.FourthWeek && (
                <div>
                  <button onClick={() => handleDeliver(membershipId)} className="text-[14px] w-auto px-10 rounded-sm h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4">
                    Mark as {userMembership.isDelivered.FirstWeek ? (userMembership.isDelivered.SecondWeek ? (userMembership.isDelivered.ThirdWeek ? 'Fourth Week' : 'Third Week') : 'Second Week') : 'First Week'} Delivered
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Membership;
