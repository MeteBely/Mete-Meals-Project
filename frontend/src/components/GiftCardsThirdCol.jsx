/* eslint-disable react/prop-types */
import { loadStripe } from '@stripe/stripe-js';
import { useGetStripePublishableKeyQuery } from '../slices/ordersApiSlice.js';
import { usePayGiftCardMutation } from '../slices/giftCardApiSlice.js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToGiftCardItems } from '../slices/giftCardSlice.js';

const GiftCardsThirdCol = ({ sumQuantity, cart, setCart }) => {
  const [payGiftCard, { isLoading: loadingGiftCard }] = usePayGiftCardMutation();
  const { data: stripeId, isLoading: loadingStripe, error: errorStripe } = useGetStripePublishableKeyQuery();

  const dispatch = useDispatch();

  const handleRemove = (e, itemQuantity, index) => {
    e.preventDefault();
    if (itemQuantity != 1) {
      const updatedCart = [...cart];
      updatedCart[index] = { ...updatedCart[index], quantity: updatedCart[index].quantity - 1 };
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart];
      setCart(updatedCart.filter((item) => item.quantity != 1));
    }
  };

  const makePayment = async () => {
    if (loadingStripe || loadingGiftCard) {
      toast.error('error');
    } else {
      const stripe = await loadStripe(stripeId);
      const res = await payGiftCard(cart);
      const result = stripe.redirectToCheckout({
        sessionId: res.data.id,
      });
      if (result.error) {
        console.log(result.error);
      }
      dispatch(addToGiftCardItems(cart));
    }
  };
  return (
    <div className="thirdCol w-[380px]">
      <div className="border border-[#b2b5bd] relative fontCera bg-white pb-[50px] pt-[30px] px-[30px] ">
        {cart.length == 0 ? (
          <>
            <span className="text-[#303235] text-[12px] font-semibold inline-block text-left ">YOUR CART IS EMPTY</span>
            <span className="text-[#b2b5bd] text-[12px] pt-4 block text-center ">You haven`t added any gifts yet</span>
          </>
        ) : (
          <>
            <span className="text-[#303235] text-[12px] font-semibold inline-block text-left ">YOUR CART ({sumQuantity})</span>
            <span className="text-[#696d75] text-[12px] block pt-4">MEAL GIFTS</span>
            {cart.map((item, index) => {
              return (
                <div key={index}>
                  <div className="text-[#696d75] text-[12px] pt-4 w-full relative">
                    <span>${item.amount} Meal Gift Card</span>
                    <a onClick={(e) => handleRemove(e, item.quantity, index)} href="" className="absolute top-[42px] right-[4px] hover:underline text-red-500">
                      Decrease
                    </a>
                  </div>
                  <span className="text-[#696d75] text-[12px] block pt-2 mb-4">Quantity: {item.quantity}</span>
                </div>
              );
            })}
            {cart.length > 0 && (
              <button className="mt-2 w-[300px] bg-[#235091] text-white text-center h-12 rounded-sm hover:bg-[#0F346C]" onClick={makePayment}>
                Proceed To Checkout
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GiftCardsThirdCol;
