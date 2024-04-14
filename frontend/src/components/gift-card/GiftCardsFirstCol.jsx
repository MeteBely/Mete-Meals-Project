/* eslint-disable react/prop-types */
const GiftCardsFirstCol = ({ amount }) => {
  return (
    <div className="firstCol ml-4">
      <div className="bg-[#0f346c] relative w-[308px] rounded-[20px] h-[200px] fontCera mb-[50px] shadow-[0_16px_30px_0px_rgba(0,0,0,0.2)]">
        <span className="absolute top-[10px] left-[20px] text-[36px] text-[#fff] font-semibold">${amount}</span>
        <p className="absolute top-[58px] text-[12px] text-[#fff] left-[20px]">MEAL E-GIFT CARD</p>
      </div>
      <ul className="list-disc text-[#696d75] mt-[50px] fontCera ml-4 text-[14px] w-[300px]">
        <li className="mb-[20px]">Recipients can use a Meal E-Gift Card towards any Market items</li>
        <li className="mb-[20px]">Etem Meals Gift Cards never expire and carry no fees</li>
      </ul>
    </div>
  );
};

export default GiftCardsFirstCol;
