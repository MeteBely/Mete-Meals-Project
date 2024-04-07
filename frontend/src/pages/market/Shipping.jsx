import { useState } from 'react';
import { saveShippingAddress } from '../../slices/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../../components/market/CheckoutSteps.jsx';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode }));
    navigate('/payment');
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20 fontCera">
      <CheckoutSteps step1 step2 underline="shipping" />
      <form action="" onSubmit={(e) => submitHandler(e)} className="my-8">
        <h1 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold mb-6">Location</h1>
        <div className="mb-4 flex flex-col items-start justify-center">
          <label className="text-[18px] font-semibold  text-[#6B6D75]" htmlFor="address">
            Address
          </label>
          <input className="border border-[#06316C] h-[40px] w-[600px] rounded-md placeholder:text-[#728285] pl-2 focus:outline-[#06316C]" type="address" name="" id="address" placeholder="Type address..." value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="mb-4 flex flex-col items-start justify-center">
          <label className=" text-[18px] font-semibold  text-[#6B6D75]" htmlFor="city">
            City
          </label>
          <input className="border border-[#06316C] h-[40px] w-[600px] rounded-md placeholder:text-[#728285] pl-2 focus:outline-[#06316C]" type="city" name="" id="city" placeholder="Type city..." value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="mb-4 flex flex-col items-start justify-center">
          <label className="text-[18px] font-semibold  text-[#6B6D75]" htmlFor="postalCode">
            Postal Code
          </label>
          <input className="border border-[#06316C] h-[40px] w-[600px] rounded-md placeholder:text-[#728285] pl-2 focus:outline-[#06316C]" type="postalCode" name="" id="postalCode" placeholder="Type postal code..." value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
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

export default Shipping;
