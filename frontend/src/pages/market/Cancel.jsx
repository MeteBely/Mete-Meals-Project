import { useEffect } from 'react';
import Warning from '../../components/common/Warning.jsx';
import { useParams } from 'react-router-dom';
import { clearMembershipDetails } from '../../slices/membershipDetailSlice.js';
import { useDispatch } from 'react-redux';
const Cancel = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMembershipDetails());
  }, [dispatch]);

  return <div className="mt-20 m-auto w-[800px]">{orderId ? <Warning negative message={`Failed in your payment! Your order id: ${orderId}`} /> : <Warning negative message={`Failed in your payment! Try again or call us.`} />}</div>;
};

export default Cancel;
