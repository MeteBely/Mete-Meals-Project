import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItems from '../../components/market/CartItems.jsx';

const CartPage = () => {
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/users/sign_in?redirect=/shipping');
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div className="mt-20">
      {cartItems.length === 0 ? (
        <div className="w-[800px] m-auto text-center fontCera bg-[#235091] rounded-md h-[120px] text-white my-10 pt-2">
          <h3 className="text-[2rem]">Your cart is empty </h3>
          <div className="flex flex-row items-center justify-center gap-8 underline">
            <Link className="hover:underline hover:text-gray-300 transition-all text-[1.5rem] fontChronicle" to={'/'}>
              HOME
            </Link>
            <Link className="hover:underline hover:text-gray-300 transition-all text-[1.5rem] fontChronicle" to={'/pricing'}>
              PLANS
            </Link>
            <Link className="hover:underline hover:text-gray-300 transition-all text-[1.5rem] fontChronicle" to={'/market'}>
              MARKET
            </Link>
            <Link className="hover:underline hover:text-gray-300 transition-all text-[1.5rem] fontChronicle" to={'/gifts'}>
              GIFT CARDS
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-evenly items-center">
          <div className="flex flex-col justify-center items-start flex-wrap pl-4 ">
            <h1 className="text-[32px] fontChronicle text-[#235091] leading-[14px] h-[40px]">SHOPPİNG CART</h1>
            {cartItems.map((cartItem, index) => {
              return <CartItems cartItem={cartItem} key={index} />;
            })}
          </div>
          <div className="card h-[475px] w-[350px] fontCera">
            <div className="border-b border-[#6B6D75] pb-2">
              {<h2 className="text-[28px]  ml-2 text-[#235091] mb-0 font-semibold">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>}
              <div className="mb-2  ml-2">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</div>
            </div>
            <div className="w-[300px] m-auto">
              <button className="mt-2 w-[300px] bg-[#235091] text-white text-center h-12 rounded-sm hover:bg-[#0F346C]" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
