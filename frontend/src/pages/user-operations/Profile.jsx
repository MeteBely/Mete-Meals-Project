import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader.jsx';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../../slices/usersApiSlice.js';
import { setCredentials } from '../../slices/authSlice.js';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice.js';
import { FaTimes } from 'react-icons/fa';
import { Form, Formik } from 'formik';
import { registerSchema } from '../../schemas/index.js';
import { Link } from 'react-router-dom';
import CustomInput from '../../components/form-components/CustomInput.jsx';

const Profile = () => {
  const { data: myOrders, isLoading: loadingMyOrders, error } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //UPDATE butonuna basınca tetiklenir, password ile password again aynı değil ise kullanıcı bilgilendirilir, aynı ise;
  //kullanıcının profili güncellenir ve dönen res ile local'deki userInfo'da güncellenir. Kullanıcı olumlu bilgilendirilir.
  const onSubmit = async (values, actions) => {
    if (values.password === values.confirmPassword) {
      try {
        const res = await updateProfile({ _id: userInfo._id, ...values }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error?.data?.message);
      }
    } else {
      toast.error("Passwords doesn't match!");
    }
  };

  return (
    <div className="flex flex-wrap flex-row mt-20 justify-evenly">
      <div className="w-[400px] fontCera">
        {/*FİRST COL  */}
        <Formik initialValues={{ name: userInfo.name, email: userInfo.email, password: '', confirmPassword: '' }} onSubmit={onSubmit} validationSchema={registerSchema}>
          {({ isSubmitting, values }) => (
            <Form className="flex flex-col gap-4 border rounded-none shadow-lg p-4 m-4">
              <CustomInput label="Name" name="name" />
              <CustomInput label="Email" name="email" />
              <CustomInput type="password" label="Password" name="password" />
              <CustomInput type="password" label="Password Again" name="confirmPassword" />
              <button type="submit" disabled={loadingUpdateProfile} className="text-[16px] w-[200px] rounded-md h-[40px] fontCera tracking-wide bg-[#235091] hover:bg-[#0F346C] text-[#fff]">
                UPDATE
              </button>
              {loadingUpdateProfile && <Loader />}
            </Form>
          )}
        </Formik>
      </div>
      <div className="fontCera">
        {/*SECOND COL  */}
        <h2 className="text-[22px] font-bold mb-4">My Orders</h2>
        {loadingMyOrders ? (
          <Loader />
        ) : error ? (
          <div>{error?.data?.message}</div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 py-3 min-[800px]:px-6 min-[640px]:table-cell hidden text-center text-[13px] tracking-[0.5px]">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3 min-[800px]:px-6 text-center text-[13px] tracking-[0.5px]">
                    DATE
                  </th>
                  <th scope="col" className="px-3 py-3 min-[800px]:px-6 text-center text-[13px] tracking-[0.5px]">
                    TOTAL
                  </th>
                  <th scope="col" className="px-3 py-3 min-[800px]:px-6 text-center text-[13px] tracking-[0.5px]">
                    PAID
                  </th>
                  <th scope="col" className="px-3 py-3 min-[800px]:px-6 text-center text-[13px] tracking-[0.5px]">
                    DELIVERED
                  </th>
                  <th scope="col" className="px-3 py-3 min-[800px]:px-6 text-center text-[13px] tracking-[0.5px]"></th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-3 min-[800px]:px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap min-[640px]:table-cell hidden dark:text-white">{order._id}</td>
                    <td className="ppx-3 min-[800px]:px-6 py-4 text-center">{order.createdAt.substring(0, 10)}</td>
                    <td className="px-3 min-[800px]:px-6 py-4 text-center">${order.totalPrice}</td>
                    <td className="px-3 min-[800px]:px-6 py-4 ">{order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-3 min-[800px]:px-6 py-4 ">{order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-3 min-[800px]:px-6 py-4">
                      <Link to={`/order/${order._id}`}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
