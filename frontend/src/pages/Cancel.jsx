import Warning from '../components/Warning.jsx';
import { useParams } from 'react-router-dom';
const Cancel = () => {
  const { id: orderId } = useParams();

  return <div className="mt-20 m-auto w-[800px]">{orderId ? <Warning negative message={`Failed in your payment! Your order id: ${orderId}`} /> : <Warning negative message={`Failed in your payment! Try again or call us.`} />}</div>;
};

export default Cancel;
