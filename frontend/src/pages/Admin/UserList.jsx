import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  //delete icon'a basılıp devam edilirse kullanıcıyı silip güncel usersları alıp gösterebilmek için refetch ediyoruz.
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await deleteUser(id);
        refetch();
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };

  return (
    <section>
      <div className="mt-20 px-2">
        <h1 className="text-[34px] tracking-wide text-[#0F346C] fontCera font-semibold mb-2">Users</h1>
        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 fontCera">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3 min-[675px]:px-6 text-center hidden min-[900px]:table-cell">
                  ID
                </th>
                <th scope="col" className="px-1 py-3 min-[550px]:px-3  min-[675px]:px-6 text-center">
                  NAME
                </th>
                <th scope="col" className="px-1 py-3 min-[550px]:px-3  min-[675px]:px-6 text-center">
                  EMAIL
                </th>
                <th scope="col" className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center">
                  ADMIN
                </th>
                <th scope="col" className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-3 py-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white hidden min-[900px]:table-cell">{user._id}</td>
                  <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                  <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 flex justify-center">{user.isAdmin ? <FaCheck style={{ color: 'green' }} className="mx-auto" /> : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                  <td className="px-1 py-3 min-[550px]:px-3min-[675px]:px-6">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="px-1 pt-[5px] min-[550px]:px-3 min-[675px]:px-6">
                    <button onClick={() => deleteHandler(user._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default UserList;
