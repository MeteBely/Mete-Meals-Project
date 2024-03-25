import Warning from '../components/Warning';
import { useParams } from 'react-router-dom';
const Cancel = () => {
  const { id: orderId } = useParams();

  return <div className="mt-20 m-auto w-[800px]">{<Warning negative message={`Failed in your payment! Your order id: ${orderId}`} />}</div>;
};

export default Cancel;
