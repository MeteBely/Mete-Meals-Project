import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../../components/market/CheckoutSteps.jsx';
import { savePaymentMethod } from '../../slices/cartSlice.js';
import { useGetUserBalanceQuery } from '../../slices/balanceApiSlice.js';
import { toast } from 'react-toastify';

const Payment = () => {
  const { data: userBalance, isLoading } = useGetUserBalanceQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isLoading) {
      if (paymentMethod === 'Balance') {
        if (userBalance && userBalance.balance >= cart.totalPrice) {
          dispatch(savePaymentMethod(paymentMethod));
          navigate('/placeorder');
        } else {
          toast.error('You have not enough balance to place order!');
        }
      } else if (paymentMethod === 'Stripe') {
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
      }
    } else {
      console.log('Server error');
    }
  };
  return (
    <div className="w-[800px] mx-auto mt-20 mb-4">
      <div className="flex justify-center mb-4">
        <CheckoutSteps step1 step2 step3 underline="payment" />
      </div>
      <h1 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold mb-6">Payment Method</h1>
      <form action="" onSubmit={(e) => submitHandler(e)}>
        <legend className="text-[20px] font-semibold  text-[#6B6D75] mb-2">Select Method</legend>
        <div className="my-2">
          <div>
            {' '}
            <label className="text-[#728285] font-semibold text-[15px] mr-1" htmlFor="Stripe">
              Credit Card with Stripe(online payment system)
            </label>
            <input name="PaymentMethod" className="accent-[#0F346C] align-middle mb-[2px]" type="radio" id="Stripe" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)} />
          </div>
          <div>
            <label className="text-[#728285] font-semibold text-[15px] mr-1" htmlFor="Balance">
              Use Balance
            </label>
            <input name="PaymentMethod" className="accent-[#0F346C] align-middle mb-[2px]" type="radio" id="Balance" value="Balance" onChange={(e) => setPaymentMethod(e.target.value)} />
          </div>
        </div>
        <div>
          <button type="submit" className="text-[16px] w-[200px] rounded-md h-[40px] fontCera tracking-wide bg-[#235091] hover:bg-[#0F346C] text-[#fff]">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
