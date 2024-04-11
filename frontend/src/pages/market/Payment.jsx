import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../../components/market/CheckoutSteps.jsx';
import { savePaymentMethod } from '../../slices/cartSlice.js';
import { useGetUserBalanceQuery } from '../../slices/balanceApiSlice.js';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import CustomRadio from '../../components/form-components/CustomRadio.jsx';
import { PaymentMethodSchema } from '../../Schemas/PaymentMethodSchema.js';

const Payment = () => {
  const { data: userBalance, isLoading } = useGetUserBalanceQuery();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Kullanıcı adres belirtmemişse(localde bulunmuyorsa) adres(shipping) page'ye yönlendiriyoruz.
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  //Continue butona bastığında tetiklenir
  // Eğer balance seçilmişse ve balance yeterli ise locale kaydedilip placeorder'a yönlendirilir, eğer balance yetersiz ise kullanıcı bilgilendirilir.
  // Eğer stripe seçilmişse local'e kaydedilip devam edilir.
  const onSubmit = async (values, actions) => {
    if (!isLoading) {
      if (values.paymentMethod === 'Balance') {
        if (userBalance && userBalance.balance >= cart.totalPrice) {
          dispatch(savePaymentMethod(values.paymentMethod));
          navigate('/placeorder');
        } else {
          toast.error('You have not enough balance to place order!');
        }
      } else if (values.paymentMethod === 'Stripe') {
        dispatch(savePaymentMethod(values.paymentMethod));
        navigate('/placeorder');
      }
    } else {
      console.log('Server error');
    }
  };

  return (
    <div className="min-[820px]:w-[800px] w-auto mx-auto mt-20 mb-4">
      <div className="flex justify-center mb-4">
        <CheckoutSteps step1 step2 step3 underline="payment" />
      </div>
      <h1 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold mb-6">Payment Method</h1>
      <Formik initialValues={{ paymentMethod: '' }} onSubmit={onSubmit} validationSchema={PaymentMethodSchema}>
        {({ values }) => (
          <Form className="flex flex-col gap-4 border rounded-none shadow-lg p-4 m-4">
            <legend className="text-[20px] font-semibold  text-[#6B6D75]">Select Method</legend>
            <CustomRadio
              label="Available Payment Methods"
              name="paymentMethod"
              options={[
                { key: 'Stripe', value: 'Credit Card with Stripe(online payment system)' },
                { key: 'Balance', value: 'Use Balance' },
              ]}
            />
            <button type="submit" className="text-[16px] w-[200px] rounded-md h-[40px] fontCera tracking-wide bg-[#235091] hover:bg-[#0F346C] text-[#fff]">
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Payment;
