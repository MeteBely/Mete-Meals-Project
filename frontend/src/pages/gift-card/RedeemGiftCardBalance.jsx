import { useState } from 'react';
import { useGetGiftCardByIdAndDeleteMutation } from '../../slices/giftCardApiSlice.js';
import { useUpdateToUserBalanceMutation } from '../../slices/balanceApiSlice.js';
import { toast } from 'react-toastify';

const RedeemGiftCardBalance = () => {
  const [giftCardId, setGiftCardId] = useState('');
  const [getGiftCardAndDelete, { isLoading }] = useGetGiftCardByIdAndDeleteMutation();
  const [updateUserBalance, { isLoading: userBalance }] = useUpdateToUserBalanceMutation();
  const submithandler = async (e) => {
    if (!userBalance && !isLoading) {
      e.preventDefault();
      const res = await getGiftCardAndDelete(giftCardId);
      if (!res.error) {
        let amount = res.data.amount;
        await updateUserBalance({ amount });
        setGiftCardId('');
        toast.success('Balance updated successfully!');
      } else {
        toast.error('Gift card code not found!');
      }
    } else {
      toast.error('something went wrong!');
    }
  };

  return (
    <section>
      <div className="w-[800px] m-auto mt-20 mb-2">
        <form className="flex flex-col items-center justify-center gap-2" action="" onSubmit={(e) => submithandler(e)}>
          <label htmlFor="giftCardKey" className="fontCera text-[20px] font-semibold">
            Sign your gift card key here...
          </label>
          <input id="giftCardKey" className="h-8 w-[240px] border border-[#06316C] rounded-md px-2 focus:outline-[#06316C]" type="text" onChange={(e) => setGiftCardId(e.target.value)} value={giftCardId} placeholder="" />
          <button className="text-[15px] w-auto px-10 rounded-md h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4" type="submit">
            Redeem
          </button>
        </form>
      </div>
    </section>
  );
};

export default RedeemGiftCardBalance;
