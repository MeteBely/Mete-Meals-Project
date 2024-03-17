import { useGetPaymentResultsQuery } from '../slices/ordersApiSlice';
import Loader from './Loader';
const Success = () => {
  const { data: paymentResults, isLoading } = useGetPaymentResultsQuery();
  console.log(paymentResults);
  return <div className="mt-20">{isLoading ? <Loader /> : <div>aALOOASDSA</div>}</div>;
};

export default Success;
