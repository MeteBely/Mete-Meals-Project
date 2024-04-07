import { useGetMealKitsQuery, useCreateMealKitMutation, useDeleteMealKitMutation } from '../../slices/mealKitsApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MealKitList = () => {
  const [createMealKit, { isLoading: loadingCreate }] = useCreateMealKitMutation();
  const [deleteMealKit, { isLoading: loadingDelete }] = useDeleteMealKitMutation();
  const { data: mealKits, refetch, isLoading, error } = useGetMealKitsQuery();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      try {
        const res = await deleteMealKit(id);
        refetch();
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create new meal kit?')) {
      try {
        await createMealKit();
        refetch();
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };
  return (
    <section>
      <div className="flex flex-row justify-around mt-20">
        <div>
          <h1 className="text-[34px] tracking-wide text-[#0F346C] fontCera font-semibold mb-2">Meal Kits</h1>
        </div>
        <div>
          <button onClick={createProductHandler} className="flex items-center text-[20px] tracking-wide text-[#0F346C] fontCera font-semibold hover:underline">
            <FaEdit /> Create Meal Kits
          </button>
        </div>
      </div>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  INGREDIENTS
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  PRICE
                </th>
                <th scope="col" className="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {mealKits.map((mealKit) => (
                <tr key={mealKit._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{mealKit._id}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{mealKit.name}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{mealKit.subTxt}</td>
                  <td className="px-6 py-4 text-center">${mealKit.price}</td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/mealKit/${mealKit._id}/edit`}>
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteHandler(mealKit._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

export default MealKitList;
