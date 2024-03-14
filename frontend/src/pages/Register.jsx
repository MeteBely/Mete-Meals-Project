import { Form, Formik } from 'formik';
import CustomInput from '../components/FormComponents/CustomInput.jsx';
import { advancedSchema } from '../Schemas/Index.jsx';
import { FaApple } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader.jsx';
import { useEffect, useState } from 'react';
import { useRegisterMutation } from '../slices/usersApiSlice.jsx';
import { setCredentials } from '../slices/authSlice.jsx';
import { toast } from 'react-toastify';

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }),
    actions.resetForm();
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const res = await register({ name, email, password }).unwrap(); //promise eder
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
        <Formik initialValues={{ firstName: '', emailAddress: '', password: '' }} onSubmit={onSubmit} validationSchema={advancedSchema}>
          {({ isSubmitting }) => (
            <Form className="mb-2" onSubmit={(e) => submitHandler(e)}>
              <CustomInput onChange={(e) => setName(e.target.value)} value={name} label="NAME" name="firstName" type="text" placeholder="Sign your name" />
              <CustomInput onChange={(e) => setEmail(e.target.value)} value={email} label="EMAIL" name="emailAddress" type="text" placeholder="Sign your email" />
              <CustomInput onChange={(e) => setPassword(e.target.value)} value={password} label="PASSWORD" name="password" type="password" placeholder="Sign your password" />
              <CustomInput onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} label="CONFIRM PASSWORD" name="confirmPassword" type="password" placeholder="Sign your password again" />
              <div className="flex flex-row justify-between w-full text-[#b9b9c5]">
                <div>
                  <input className="align-middle mr-2 cursor-pointer" type="checkbox" name="" id="rememberAcc" />
                  <label htmlFor="rememberAcc" className="text-[14px] fontCera cursor-pointer">
                    Remember Me?
                  </label>
                </div>
                <Link to="/users/password/new" href="" className="text-[#0f346c] hover:underline text-[14px] fontCera">
                  Forgot Password?
                </Link>
              </div>
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
