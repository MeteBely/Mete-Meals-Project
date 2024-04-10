import { useGetGiftCardByIdAndDeleteMutation } from '../../slices/giftCardApiSlice.js';
import { useUpdateToUserBalanceMutation } from '../../slices/balanceApiSlice.js';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import CustomInput from '../../components/form-components/CustomInput.jsx';
import Loader from '../../components/common/Loader.jsx';

const RedeemGiftCardBalance = () => {
  const [getGiftCardAndDelete, { isLoading }] = useGetGiftCardByIdAndDeleteMutation();
  const [updateUserBalance, { isLoading: userBalance }] = useUpdateToUserBalanceMutation();

  const onSubmit = async (values) => {
    if (!userBalance && !isLoading) {
      const res = await getGiftCardAndDelete(values.giftCardId);
      if (!res.error) {
        let amount = res.data.amount;
        await updateUserBalance({ amount });
        values.giftCardId = '';
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
      <div className="w-[400px] m-auto mt-20 mb-2">
        <Formik initialValues={{ giftCardId: '' }} onSubmit={onSubmit}>
          {({ isSubmitting, values }) => (
            <Form className="flex flex-col gap-4 border rounded-none shadow-lg p-4 m-4 ">
              <CustomInput label="Sign your gift card key here..." name="giftCardId" />
              <button disabled={isLoading} className="text-[15px] w-auto px-10 rounded-md h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera mt-4" type="submit">
                Redeem
              </button>
              {isLoading && <Loader />}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default RedeemGiftCardBalance;
