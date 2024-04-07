import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { toast } from 'react-toastify';

const UserEdit = () => {
  const { id: userId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  console.log(isAdmin);
  return (
    <section>
      <div className="mt-20 px-2 mb-2">
        <div className="ml-20 mt-4">
          <Link className="text-[14px] w-auto px-10 py-2 rounded-sm fontCera tracking-widest bg-orange-500 hover:bg-[#FF8142] text-[#fff] fontCera mt-4" to="/admin/userlist">
            Go Back
          </Link>
        </div>
        <div className=" w-[800px] m-auto">
          <h2 className="text-[34px] tracking-wide text-[#0F346C] fontCera font-semibold mb-[10px]">Edit User</h2>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <form action="" onSubmit={(e) => submitHandler(e)}>
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
              <div className="flex flex-row items-center gap-2 mb-4">
                <label htmlFor="isAdmin" className="text-[20px]">
                  Admin
                </label>
                <input type="checkbox" checked={isAdmin} id="isAdmin" onChange={(e) => setIsAdmin(e.target.checked)} />
              </div>
              <div>
                <button className="text-[14px] w-auto px-10 rounded-sm h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4" type="submit">
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserEdit;
