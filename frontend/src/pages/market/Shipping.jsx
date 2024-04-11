import { saveShippingAddress } from '../../slices/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../../components/market/CheckoutSteps.jsx';
import CustomInput from '../../components/form-components/CustomInput.jsx';
import { Form, Formik } from 'formik';
import { addressSchema } from '../../schemas/index.js';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Continue butonuna basılırsa tetiklenir, Formik'teki adres bilgileri local'de save edilerek payment page'ye yönlendirilir.
  const onSubmit = async (values, actions) => {
    dispatch(saveShippingAddress(values));
    navigate('/payment');
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 fontCera">
      <CheckoutSteps step1 step2 underline="shipping" />
      <Formik initialValues={{ address: shippingAddress?.address || '', city: shippingAddress?.city || '', postalCode: shippingAddress?.postalCode || '' }} onSubmit={onSubmit} validationSchema={addressSchema}>
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap-4 border rounded-none shadow-lg p-4 m-4 min-[820px]:w-[800px] w-[460px]">
            <h1 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold mb-6">Location</h1>
            <CustomInput label="Address" name="address" />
            <CustomInput label="City" name="city" />
            <CustomInput label="Postal Code" name="postalCode" />
            <button type="submit" className="text-[16px] w-[200px] rounded-md h-[40px] fontCera tracking-wide bg-[#235091] hover:bg-[#0F346C] text-[#fff]">
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Shipping;
