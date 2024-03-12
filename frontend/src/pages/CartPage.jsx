import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItems from '../components/CartItems';

const CartPage = () => {
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div className="mt-20">
      {cartItems.length === 0 ? (
        <h3>
          Your cart is empty <Link to={'/'}>GO BACK</Link>
        </h3>
      ) : (
        <div className="flex flex-row justify-evenly items-center">
          <div className="flex flex-col justify-center items-start flex-wrap pl-4 ">
            <h1 className="text-[32px] fontChronicle text-[#06316C] leading-[16px] h-[40px]">SHOPPİNG CART</h1>
            {cartItems.map((cartItem, index) => {
              return <CartItems cartItem={cartItem} key={index} />;
            })}
          </div>
          <div className="card h-[475px] w-[350px]">
            {<h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>}
            <div>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</div>
            <button disabled={cartItems.length === 0} onClick={checkoutHandler}>
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
