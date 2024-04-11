import { Form, Formik } from 'formik';
import CustomInput from '../../components/form-components/CustomInput.jsx';
import { loginSchema } from '../../schemas/index.js';
import { FaApple } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader.jsx';
import { useEffect } from 'react';
import { useLoginMutation } from '../../slices/usersApiSlice.js';
import { setCredentials } from '../../slices/authSlice.js';
import { toast } from 'react-toastify';

const LogIn = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //zaten userInfo varsa buraya yönlendirme yapılan yerde nereye redirect paramı kullanılmışsa oraya yönlendiriyoruz.
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  //LOG IN butonuna basılırsa tetiklenir, girilen bilgiler doğru ise setCredentials ile local'e userInfo savelenir(backend endpoint'den dönen veriler ile). Var ise redirect edilir, yoksa home page'e yönlenilir.
  const onSubmit = async (values, actions) => {
    try {
      const res = await login(values).unwrap(); //promise eder
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err?.error || err);
    }
  };

  return (
    <section className="bg-[#FAFBFC] mt-[62px] border-t-[1px] border-[#ECEEF2] pb-8">
      <div className="w-[375px] h-auto pb-6 m-auto bg-white mt-8 pt-2 px-4 card rounded-[4px]">
        <h1 className="text-[#303236] text-[30px] text-center mb-[6px] fontCera font-semibold ">Log In</h1>
        <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit} validationSchema={loginSchema}>
          {({ values }) => (
            <Form className="flex flex-col gap-4 border rounded-none  p-4 m-4">
              <CustomInput label="Email" name="email" />
              <br />
              <CustomInput type="password" label="Password" name="password" />
              <button type="submit" disabled={isLoading} className="text-[14px] w-full h-[47.88px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4">
                LOG IN
              </button>
              {isLoading && <Loader />}
            </Form>
          )}
        </Formik>
        <div className="inline-block border-b-2 align-middle border-t-[#ECEEF2] w-[155px]"></div>
        <div className="text-center text-[#6a6d75] fontCera inline-block mx-2">or</div>
        <div className="inline-block border-b-2 align-middle border-b-[#ECEEF2] w-[155px]"></div>
        <div className="text-white fontChronicle text-[20px] mt-2">
          <button className="bg-black w-full h-[47.88px] relative mb-3 rounded-[5px]">
            <FaApple fontSize="1em" className="absolute left-[58px] top-3.5" />
            Sign in with Apple
          </button>
          <button className="bg-blue-500 w-full h-[47.88px] relative rounded-[5px]">
            <FaFacebook fontSize="1em" className="absolute left-[46px] top-3.5" />
            Sign in with Facebook
          </button>
        </div>
        <div className="text-center text-[14px] fontCera text-[#6a6d75] mt-6">
          Don`t have an account?{' '}
          <Link to={redirect ? `/users/sign_up?redirect=${redirect}` : '/users/sign_up'} href="" className="text-[#0f346c] underline">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
