import { useState } from 'react';
import { useGetGiftCardByIdAndDeleteMutation } from '../../slices/giftCardApiSlice.js';
import { useUpdateToUserBalanceMutation } from '../../slices/balanceApiSlice.js';

const RedeemGiftCardBalance = () => {
  const [giftCardId, setGiftCardId] = useState('');
  const [getGiftCardAndDelete, { isLoading }] = useGetGiftCardByIdAndDeleteMutation();
  const [updateUserBalance, { isLoading: userBalance }] = useUpdateToUserBalanceMutation();
  const submithandler = async (e) => {
    e.preventDefault();
    const res = await getGiftCardAndDelete(giftCardId);
    let amount = res.data.amount;
    await updateUserBalance({ amount });
  };

  return (
    <section>
      <div className="w-[800px] m-auto mt-20">
        <form action="" onSubmit={(e) => submithandler(e)}>
          <input type="text" onChange={(e) => setGiftCardId(e.target.value)} value={giftCardId} placeholder="Sign your gift card key here..." />
          <button type="submit">BAS KANKA</button>
        </form>
      </div>
    </section>
  );
};

export default RedeemGiftCardBalance;
