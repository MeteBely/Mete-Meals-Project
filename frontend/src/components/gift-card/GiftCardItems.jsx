/* eslint-disable react/prop-types */
const GiftCardItems = ({ giftCard }) => {
  return (
    <div className="flex flex-col items-center justify-start border border-black rounded-md h-20 p-2">
      <h4 className="text-[#728285] font-semibold text-[15px] mr-1">${giftCard.amount} Gift Card</h4>
      <div>
        Quantity: <span>{giftCard.quantity}</span>
      </div>
    </div>
  );
};

export default GiftCardItems;
