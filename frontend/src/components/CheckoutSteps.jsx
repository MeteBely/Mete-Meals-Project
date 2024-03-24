/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CheckoutSteps = ({ step1, step2, step3, step4, underline }) => {
  return (
    <nav className="flex flex-row gap-6">
      <div>
        {step1 ? (
          <Link to="/users/sign_in" className={`text-[18px] ${underline === 'sign in' ? 'underline underline-offset-4' : 'no-underline'} text-[#0F346C]`}>
            Sign In
          </Link>
        ) : (
          <Link aria-disabled className="text-[#A0A6A6] text-[18px]">
            Sign In
          </Link>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to="/shipping" className={`text-[18px] ${underline === 'shipping' ? 'underline underline-offset-4' : 'no-underline'} text-[#0F346C]`}>
            Shipping
          </Link>
        ) : (
          <Link aria-disabled className="text-[#A0A6A6] text-[18px]">
            Shipping
          </Link>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/payment" className={`text-[18px] ${underline === 'payment' ? 'underline underline-offset-4' : 'no-underline'} text-[#0F346C]`}>
            Payment
          </Link>
        ) : (
          <Link aria-disabled className="text-[#A0A6A6] text-[18px]">
            Payment
          </Link>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to="/placeorder" className={`text-[18px] ${underline === 'place order' ? 'underline underline-offset-4' : 'no-underline'} text-[#0F346C]`}>
            Place Order
          </Link>
        ) : (
          <Link aria-disabled className="text-[#A0A6A6] text-[18px]">
            Place Order
          </Link>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;
