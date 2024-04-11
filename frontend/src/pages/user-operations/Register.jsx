import { Form, Formik } from 'formik';
import CustomInput from '../../components/form-components/CustomInput.jsx';
import { RegisterSchema } from '../../Schemas';
import { FaApple } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader.jsx';
import { useEffect } from 'react';
import { useRegisterMutation } from '../../slices/usersApiSlice.js';
import { setCredentials } from '../../slices/authSlice.js';
import { toast } from 'react-toastify';

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
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

  //password ile password again aynı mı diye kontrol edilir, değil ise kullanıcı bilgilendirilir. Aynı ise;
  //kullanıcı kayıt edilir. Dönen res ile local'e userInfo save edilir. varsa redirect edilir.
  const onSubmit = async (values, actions) => {
    if (values.password === values.confirmPassword) {
      try {
        const res = await register(values).unwrap(); //promise eder
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    } else {
      toast.error('passwords not match!');
      return;
    }
  };

  return (
    <section className="bg-[#FAFBFC] mt-[62px] border-t-[1px] border-[#ECEEF2] pb-8">
      <div className="w-[375px] h-auto pb-6 m-auto bg-white mt-8 pt-2 px-4 card rounded-[4px]">
        <h1 className="text-[#303236] text-[30px] text-center mb-[6px] fontCera font-semibold ">Register</h1>
        <Formik initialValues={{ name: '', email: '', password: '', confirmPassword: '' }} onSubmit={onSubmit} validationSchema={RegisterSchema}>
          {({ isSubmitting, values }) => (
            <Form className="flex flex-col gap-4 border rounded-none shadow-lg p-4 m-4">
              <CustomInput label="Name" name="name" />
              <CustomInput label="Email" name="email" />
              <CustomInput type="password" label="Password" name="password" />
              <CustomInput type="password" label="Password Again" name="confirmPassword" />
              <button type="submit" disabled={isLoading} className="text-[14px] w-full h-[47.88px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4">
                REGISTER
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
          Have a account?{' '}
          <Link to={redirect ? `/users/sign_in?redirect=${redirect}` : '/users/sign_in'} href="" className="text-[#0f346c] underline">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
