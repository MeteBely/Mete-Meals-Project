/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../../slices/cartSlice.js';
import { useGetMealDetailsQuery } from '../../slices/mealsApiSlice.js';
import { useDispatch } from 'react-redux';
import Loader from '../common/Loader.jsx';
const CartItems = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { data: firstMealOfKit, isLoading } = useGetMealDetailsQuery(cartItem.meals[0].meal._id);

  const addToCartHandler = async (cartItem, qty) => {
    dispatch(addToCart({ ...cartItem, qty }));
  };

  const removeToCartHandler = async (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="fontCera w-[800px] mb-[20px] flex flex-row items-center justify-start gap-2 border-b border-[#6B6D75] pb-[20px]">
          <Link to={`/market/mealKit/${cartItem._id}`}>
            <img src={firstMealOfKit.img} className="cursor-pointer w-[150px] h-[150px] rounded-[8px]" />
          </Link>
          <div className="w-[350px]">
            <Link to={`/market/mealKit/${cartItem._id}`} className="font-semibold text-[#303236] inline-block mt-4 hover:underline text-[16px] cursor-pointer">
              {cartItem.name}
            </Link>
            <p className="text-[#6a6d75] text-[14px] leading-[14px]">{cartItem.subTxt}</p>
          </div>
          <div className="mr-8">
            <form>
              <input onChange={(e) => addToCartHandler(cartItem, Number(e.target.value))} value={cartItem.qty} max={10} min={1} type="number" className="border border-[#d3d5db] p-[6px] rounded-[4px]  w-[50px] h-[30px] leading-8 text-[16px] text-center" />
            </form>
            <div className="text-[#303236] inline-block mt-[12px]">${Number(cartItem.price * cartItem.qty).toFixed(2)}</div>
          </div>
          <div>
            <button onClick={() => removeToCartHandler(cartItem._id)}>
              <FaTrash size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItems;
