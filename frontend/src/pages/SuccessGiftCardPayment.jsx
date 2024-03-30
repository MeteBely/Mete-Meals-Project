import { useGetPaymentResultsQuery } from '../slices/ordersApiSlice';
import { saveGiftCardCodes } from '../slices/giftCardSlice';
import { useDispatch } from 'react-redux';
import { useCreateGiftCardCodesMutation } from '../slices/giftCardApiSlice';
import Loader from './Loader';
import Warning from '../components/Warning';
import { useSelector } from 'react-redux';
import GiftCardItems from '../components/GiftCardItems';

const SuccessGiftCardPayment = () => {
  const dispatch = useDispatch();

  const { data: paymentResults, isLoading } = useGetPaymentResultsQuery();
  const [createGiftCardCodes, { isLoading: creatingGiftCard }] = useCreateGiftCardCodesMutation();
  const { giftCardItems: giftCards, giftCardCodes } = useSelector((state) => state.giftCard);

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
    <div className="mt-20 m-auto w-[800px]">
      {isLoading ? (
        <Loader />
      ) : (
        <section className="">
          <h1 className="text-[32px] tracking-wide text-green-500 fontCera font-semibold mb-6">Payment successful</h1>
          <Warning message={`Thank you for your payment! Your gift card code is: ${'DENEME'}`} />
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
              <button disabled={giftCardCodes.length !== 0} onClick={createGiftCardCodesFunction}>
                SHOW KEYS
              </button>
            </div>
            {giftCardCodes &&
              giftCardCodes.length > 0 &&
              giftCardCodes.map((code, index) => (
                <div key={index}>
                  amount: {code.amount}code: {code.key}
                </div>
              ))}
            <div>
              <p>Bu kodlari kaybetmemeye özen gösteriniz, bu sayfa kodlari görüntüleyebileceğiniz tek yerdir.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SuccessGiftCardPayment;
