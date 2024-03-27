import { useGetPaymentResultsQuery } from '../slices/ordersApiSlice';
import Loader from './Loader';
import Warning from '../components/Warning';

const SuccessGiftCardPayment = () => {
  const { data: paymentResults, isLoading } = useGetPaymentResultsQuery();
  console.log(paymentResults);
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
            {/* <div className="flex flex-row items-center justify-center">
          <h4 className="text-[#728285] font-semibold text-[15px] mr-1">Total payment:</h4>
          <span className="">${paymentResults.data.reduce((acc, item) => acc + item.data.object.amount_total * )}</span>
        </div> */}
          </div>
        </section>
      )}
    </div>
  );
};
//{cartItems.reduce((acc, item) => acc + item.qty, 0)}
export default SuccessGiftCardPayment;
