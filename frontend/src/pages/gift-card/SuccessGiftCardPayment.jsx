import { useGetPaymentResultsQuery } from '../../slices/ordersApiSlice.js';
import { saveGiftCardCodes } from '../../slices/giftCardSlice.js';
import { useDispatch } from 'react-redux';
import { useCreateGiftCardCodesMutation } from '../../slices/giftCardApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import Warning from '../../components/common/Warning.jsx';
import { useSelector } from 'react-redux';
import GiftCardItems from '../../components/gift-card/GiftCardItems.jsx';
import { FaExclamation } from 'react-icons/fa';

const SuccessGiftCardPayment = () => {
  const { data: paymentResults, isLoading } = useGetPaymentResultsQuery();
  const [createGiftCardCodes, { isLoading: creatingGiftCard }] = useCreateGiftCardCodesMutation();
  const { giftCardItems: giftCards, giftCardCodes } = useSelector((state) => state.giftCard);
  const dispatch = useDispatch();

  //show keys butonuna basılınca kişinin satın aldığı gift cardların amount'unu alıp teker teker db'ye kayıt ediyoruz. Ayrıca sayfa yenilendiğinde kodları kaybetmemek için local'e de kayıt ediyoruz.
  const createGiftCardCodesFunction = () => {
    if (!creatingGiftCard && giftCards && giftCards.length > 0) {
      const ids = [];
      // Asenkron işlemleri beklemek için Promise.all kullanıyoruz
      Promise.all(
        giftCards.map(async (giftCard) => {
          for (let i = 0; i < giftCard.quantity; i++) {
            let amount = giftCard.amount;
            let res = await createGiftCardCodes({ amount }).unwrap();
            ids.push({ key: res._id, amount: res.amount });
          }
        })
      ).then(() => {
        // Tüm asenkron işlemler tamamlandığında dispatch çağırılır
        dispatch(saveGiftCardCodes(ids));
      });
    }
  };

  return (
    <div className="mt-20 px-2 m-auto min-[840px]:w-[800px] w-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <section className="">
          <h1 className="text-[32px] tracking-wide text-[#235091] fontCera font-semibold mb-6">Payment successful</h1>
          <div className="min-[840px]:w-auto w-[475px] mx-auto">
            <Warning message="Thank you for your payment!" />
          </div>
          <div className="flex flex-col gap-2 fontCera items-start justify-center">
            <div className="flex flex-row">
              <h4 className="text-[#728285] font-semibold text-[15px] mr-1">Name:</h4>
              <span className="">{paymentResults.data[0].data.object.customer_details.name}</span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <h4 className="text-[#728285] font-semibold text-[15px] mr-1">Email:</h4>
              <span className="">{paymentResults.data[0].data.object.customer_details.email}</span>
            </div>
            <div className="flex flex-row gap-4">
              {giftCards.map((giftCard, index) => (
                <GiftCardItems giftCard={giftCard} key={index} />
              ))}
            </div>
            <div className="flex flex-row items-center justify-center">
              <h4 className="text-[#728285] font-semibold text-[15px] mr-1">Total Price:</h4>
              <span className="">${giftCards.reduce((acc, item) => acc + item.amount * item.quantity, 0)}</span>
            </div>
            <div>
              <button className="text-[15px] w-auto px-10 rounded-md h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera" disabled={giftCardCodes.length !== 0} onClick={createGiftCardCodesFunction}>
                SHOW KEYS
              </button>
            </div>
            {giftCardCodes &&
              giftCardCodes.length > 0 &&
              giftCardCodes.map((code, index) => (
                <div key={index}>
                  amount: ${code.amount} / code: {code.key}
                </div>
              ))}
            <div className="w-auto">
              <p className="flex flex-row items-start min-[755px]:items-center">
                <FaExclamation color="red" size={24} />
                Be careful to not lose these codes, this page is the only place where you can view the codes.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SuccessGiftCardPayment;
