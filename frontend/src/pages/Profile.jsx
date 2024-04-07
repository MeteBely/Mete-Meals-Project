import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader.jsx';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice.js';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: myOrders, isLoading: loadingMyOrders, error } = useGetMyOrdersQuery();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
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
    <div className="flex flex-row mt-20 justify-evenly">
      <div className="w-[400px] fontCera">
        {/*FİRST COL  */}
        <form onSubmit={submitHandler}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-[20px]">
              Name
            </label>
            <input className="h-10 border border-[#06316C] rounded-md px-2 focus:outline-[#06316C]" type="text" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-[20px]">
              Email
            </label>
            <input className="h-10 border border-[#06316C] rounded-md px-2 focus:outline-[#06316C]" type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[20px]" htmlFor="password">
              Password
            </label>
            <input className="h-10 border border-[#06316C] rounded-md px-2 focus:outline-[#06316C] tracking-widest" autoComplete="on" type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[20px]" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input className="h-10 border border-[#06316C] rounded-md px-2 focus:outline-[#06316C] tracking-widest" autoComplete="on" type="password" id="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="flex flex-col mb-2">
            <button type="submit" className="text-[16px] w-[200px] rounded-md h-[40px] fontCera tracking-wide bg-[#235091] hover:bg-[#0F346C] text-[#fff]">
              UPDATE
            </button>
            {loadingUpdateProfile && <Loader />}
          </div>
        </form>
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
                  <th scope="col" className="px-6 py-3 text-center text-[13px] tracking-[0.5px]">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-[13px] tracking-[0.5px]">
                    DATE
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-[13px] tracking-[0.5px]">
                    TOTAL
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-[13px] tracking-[0.5px]">
                    PAID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-[13px] tracking-[0.5px]">
                    DELIVERED
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-[13px] tracking-[0.5px]"></th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{order._id}</td>
                    <td className="px-6 py-4 text-center">{order.createdAt.substring(0, 10)}</td>
                    <td className="px-6 py-4 text-center">${order.totalPrice}</td>
                    <td className="px-6 py-4 ">{order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-6 py-4 ">{order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-6 py-4">
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
