import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import CustomInput from '../../components/form-components/CustomInput.jsx';
import CustomCheckbox from '../../components/form-components/CustomCheckbox.jsx';
import { userEditSchema } from '../../schemas/index.js';

const UserEdit = () => {
  const { id: userId } = useParams();
  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();

  //form submit olunca user'i güncelliyoruz, güncel user'i göstermek için refetch ediyoruz ve userlist'e navigate ediyoruz kullanıcıyı.
  const onSubmit = async (values) => {
    try {
      await updateUser({
        userId,
        ...values,
      });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <section>
      <div className="mt-20 px-2 mb-2">
        <div className="ml-20 mt-4">
          <Link className="text-[14px] w-auto px-10 py-2 rounded-sm fontCera tracking-widest bg-orange-500 hover:bg-[#FF8142] text-[#fff] fontCera mt-4" to="/admin/userlist">
            Go Back
          </Link>
        </div>
        <div className="w-auto min-[825px]:w-[800px] m-auto">
          <h2 className="text-[34px] tracking-wide text-[#0F346C] fontCera font-semibold mb-[10px]">Edit User</h2>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Formik onSubmit={onSubmit} initialValues={{ name: user.name, email: user.email, isAdmin: user.isAdmin }} validationSchema={userEditSchema}>
              {() => (
                <Form className="flex flex-col gap-4 border rounded-none shadow-lg p-4 m-4">
                  <CustomInput label="Name" name="name" />
                  <CustomInput label="Email" name="email" />
                  <CustomCheckbox label="Admin" name="isAdmin" />
                  <button className="text-[14px] w-auto px-10 rounded-sm h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4" type="submit">
                    Update
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserEdit;
