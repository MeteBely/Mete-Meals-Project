import { useGetMembershipsQuery } from '../../slices/membershipApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';
import { useDeleteMembershipMutation } from '../../slices/membershipApiSlice.js';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const MembershipList = () => {
  const { data: memberships, isLoading, error, refetch } = useGetMembershipsQuery();
  const [deleteMembership, { isLoading: loadingDeleteMembership }] = useDeleteMembershipMutation();

  //delete icon'a basılıp devam edilirse ilgili membership silinir.
  const membershipDelete = async (membershipId) => {
    if (window.confirm('Are you sure you want to delete this membership?')) {
      try {
        const res = await deleteMembership(membershipId);
        refetch();
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };

  //güncelleme sayfasında güncelleyip direkt list sayfasına tekrar gelirsek güncel olarak veriyi görebilmek için refect()'i tekrar çalıştırıyoruz.
  useEffect(() => {
    refetch();
  }, [memberships, refetch]);

  return (
    <section>
      <div className="mt-20 px-2 fontCera">
        <div>
          <h1 className="text-[34px] tracking-wide text-[#0F346C] fontCera font-semibold mb-2">Memberships</h1>
        </div>
        <div className="flex flex-row justify-around"></div>
        {loadingDeleteMembership && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center hidden min-[1355px]:table-cell">
                    Membership Id
                  </th>
                  <th scope="col" className="px-6 py-3 text-center hidden min-[1475px]:table-cell">
                    Creating At
                  </th>
                  <th scope="col" className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center">
                    User Name
                  </th>
                  <th scope="col" className="px-3 py-3 hidden min-[850px]:table-cell min-[1125px]:px-6 text-center">
                    User Email
                  </th>
                  <th scope="col" className="px-3 py-3 hidden min-[925px]:table-cell min-[1125px]:px-6 text-center">
                    Total price
                  </th>
                  <th scope="col" className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center">
                    First Week Delivery
                  </th>
                  <th scope="col" className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center">
                    Second Week Delivery
                  </th>
                  <th scope="col" className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center">
                    Third Week Delivery
                  </th>
                  <th scope="col" className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center">
                    Fourth Week Delivery
                  </th>
                  <th scope="col" className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {memberships.map((membership) => (
                  <tr key={membership._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white hidden min-[1355px]:table-cell">{membership._id}</td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white hidden min-[1475px]:table-cell">{membership.createdAt.slice(0, 10)}</td>
                    <td className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{membership.user.name}</td>
                    <td className="px-3 py-3 hidden min-[850px]:table-cell min-[1125px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{membership.user.email}</td>
                    <td className="px-3 py-3 min-[1125px]:px-6 hidden min-[925px]:table-cell text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">${membership.plan.subTotal}</td>
                    <td className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{membership.isDelivered.FirstWeek ? <FaCheck className="mx-auto" style={{ color: 'green' }} /> : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{membership.isDelivered.SecondWeek ? <FaCheck className="mx-auto" style={{ color: 'green' }} /> : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{membership.isDelivered.ThirdWeek ? <FaCheck className="mx-auto" style={{ color: 'green' }} /> : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{membership.isDelivered.FourthWeek ? <FaCheck className="mx-auto" style={{ color: 'green' }} /> : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                    <td className="px-1 py-3 min-[605px]:px-3 min-[1125px]:px-6">
                      <Link to={`/membership/${membership._id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td className="px-1 pt-[5px] min-[605px]:px-3 min-[1125px]:px-6">
                      <button onClick={() => membershipDelete(membership._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default MembershipList;
