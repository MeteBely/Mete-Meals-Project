import { useGetPaymentResultsQuery } from '../slices/ordersApiSlice';
import Loader from './Loader';
import Warning from '../components/Warning';
import { useSelector } from 'react-redux';
import GiftCardItems from '../components/GiftCardItems';

const SuccessGiftCardPayment = () => {
  const { data: paymentResults, isLoading } = useGetPaymentResultsQuery();
  const giftCards = useSelector((state) => state.giftCard);
  console.log(giftCards);
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
          </div>
        </section>
      )}
    </div>
  );
};

export default SuccessGiftCardPayment;
