import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../../slices/cartSlice.js';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMealKitDetailsQuery, useCreateReviewMutation } from '../../slices/mealKitsApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import Meta from '../../components/common/Meta.jsx';
import { Formik, Form } from 'formik';
import CustomInput from '../../components/form-components/CustomInput.jsx';
import CustomTextarea from '../../components/form-components/CustomTextarea.jsx';
import { reviewSchema } from '../../schemas/index.js';
import classNames from 'classnames';

const MealKitDetail = () => {
  const { id: mealKitId } = useParams();
  const { data: mealKit, refetch, isLoading } = useGetMealKitDetailsQuery(mealKitId); //İlgili meal kiti url parama göre getirdik.
  const [createReview, { isLoading: isReviewLoading }] = useCreateReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [activeDesc, setActiveDesc] = useState('itemOne');
  const [activeImage, setActiveImage] = useState('');

  //ilk başta ana gösterimde olan img'yi ayarlıyoruz.(meal kitin ilk mealinin img'sini set ettik.) Eğer meal kit yeni oluşturulmuşsa ve içine meal konmamışsa hata almamak için mealKit.meals[0] && yapısını kullanıyoruz.
  useEffect(() => {
    if (!isLoading && mealKit) {
      setActiveImage(mealKit.meals[0] && mealKit.meals[0].meal.img);
    }
  }, [isLoading, mealKit]);

  //ADD TO BASKET'e basınca meal kiti ve seçili quantity'yi cart'a ekler ve localde saklar.
  const addToCartHandler = () => {
    dispatch(addToCart({ ...mealKit, qty }));
    navigate('/cart');
  };

  //Submit'e basınca(yorum yap butonu) tetiklenir, yorumu oluşturur ve göstermek için refetch eder.
  const onSubmit = async (values) => {
    try {
      await createReview({ mealKitId, ...values }).unwrap();
      refetch();
      toast.success('Review submitted successfully!');
      values.rating = 1;
      values.comment = '';
    } catch (err) {
      toast.error(err.data && 'Meal kit already reviewed!');
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="mt-20 px-2">
          <Meta title={mealKit.name} />
          <div className="flex flex-wrap flex-row items-start justify-center gap-8 mb-10">
            <div className="w-[570px]">
              <div className="mb-6">
                <img src={activeImage && activeImage} alt="" />
              </div>
              <div className="flex flex-row flex-wrap gap-4 justify-start items-center">
                {mealKit.meals.map((singleMeal) => (
                  <button className="w-[130px] h-[130px] cursor-pointer" key={singleMeal.meal._id} onClick={() => setActiveImage(singleMeal.meal.img)}>
                    <img src={singleMeal.meal.img}></img>
                  </button>
                ))}
              </div>
            </div>
            <div className="w-[570px]">
              <div className="mb-8">
                <h1 className="text-[28px] fontCera font-semibold text-[#303236] tracking-wider">{mealKit.name}</h1>
                <h2 className="fontCera text-[#6a6d75] tracking-wide">{mealKit.subTxt}</h2>
              </div>
              <div className="mb-8">
                <span className="text-[#303236] text-[20px] fontCera font-semibold leading-[40px] mr-6">Price ${mealKit.price}</span>
                <form action="" className="inline-block" onSubmit={addToCartHandler}>
                  <input onChange={(e) => setQty(Number(e.target.value))} value={qty} max={10} min={1} type="number" className="border border-[#d3d5db] p-[6px] rounded-[4px]  w-[70px] h-[50px] leading-10 text-[18px] text-center mr-4" />
                  <input type="submit" value={' ADD TO BASKET'} className="text-[14px] px-9 bg-[#F26C29] hover:bg-[#FF8142] h-[50px] fontCera tracking-wider  text-[#fff] rounded-sm cursor-pointer" />
                </form>
              </div>
              <div className="text-[#303236] fontCera leading-[1.8] text-[15px] mb-8">
                <p>{mealKit.description}</p>
              </div>
              <div className="w-full flex flex-row justify-center items-center gap-8">
                <button onClick={() => setActiveDesc('itemOne')} className={`${activeDesc === 'itemOne' ? 'font-semibold border-[#012684] text-[#012684] hover:text-[#012684] border-b-2 cursor-pointer  ' : 'text-[#6B6D75] font-normal hover:text-[#012684] cursor-pointer'}w-auto h-[50px]`}>
                  What's Included
                </button>
                <button onClick={() => setActiveDesc('itemTwo')} className={`${activeDesc === 'itemTwo' ? 'font-semibold border-[#012684] text-[#012684] hover:text-[#012684] border-b-2 cursor-pointer' : 'text-[#6B6D75] font-normal hover:text-[#012684] cursor-pointer'}w-auto h-[50px]`}>
                  Order & Shipping
                </button>
                <button onClick={() => setActiveDesc('itemThree')} className={`${activeDesc === 'itemThree' ? 'font-semibold text-[#012684] hover:text-[#012684] cursor-pointer border-[#012684] border-b-2 ' : 'text-[#6B6D75] font-normal hover:text-[#012684] cursor-pointer'}w-auto h-[50px]`}>
                  Nutrition Facts
                </button>
              </div>
              <div className="border border-[#6B6D75] mt-4 rounded-md">
                <p className={`${activeDesc === 'itemOne' ? 'block text-[#303236] fontCera leading-[1.4] text-[15px] px-4 py-2' : 'hidden'}`}>All the ingredients you need to create two/four delicious Etem Meals Wellness recipes with easy-to-follow recipe cards and chef tips!</p>
                <p className={`${activeDesc === 'itemTwo' ? 'block text-[#303236] fontCera leading-[1.4] text-[15px] px-4 py-2' : 'hidden'}`}>Order by 12:00 pm ET on Friday, March 15th for delivery the week of March 17th. Requests for order cancellation or changes must be received by Friday, March 15th at 1:00 pm ET — reach out to market@etemmeals.com for more information.</p>
                <div className={`${activeDesc === 'itemThree' ? 'block text-[#303236] fontCera leading-[1.4] text-[15px] px-4 py-2' : 'hidden'}`}>
                  <ul className="list-disc pl-2">
                    {mealKit.meals.map((singleMeal) => (
                      <Link className="cursor-pointer hover:underline inline-block" key={singleMeal.meal._id} to={`/on-the-menu/meal/${singleMeal.meal._id}`}>
                        <li>
                          {singleMeal.meal.name} {singleMeal.meal.subTxt}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-10 min-[1050px]:w-auto w-[600px]">
              <h2 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold mb-1">Reviews</h2>
              {mealKit.reviews && mealKit.reviews.length > 0 ? (
                mealKit.reviews.map((review, index) => (
                  <div
                    className={classNames({
                      'fontCera mb-4 pb-4': true,
                      'border-b-2 border-red-100': index !== mealKit.reviews.length - 1,
                    })}
                    key={review._id}
                  >
                    <div>
                      <span className="mr-1 text-lg">Name:</span>
                      {review.name}
                    </div>
                    <div>
                      <span className="mr-1 text-lg">Rating:</span>
                      {review.rating}
                    </div>
                    <div className="border rounded-md p-2 shadow-md">{review.comment}</div>
                    <p className="">{review.createdAt.substring(0, 10)}</p>
                  </div>
                ))
              ) : (
                <div className="fontCera mb-8">No Reviews</div>
              )}
              <h3 className="text-[22px] tracking-wide text-[#0F346C] fontCera font-semibold">Write Review</h3>
              {isReviewLoading && <Loader />}
              {userInfo ? (
                <Formik initialValues={{ rating: 1, comment: '' }} onSubmit={onSubmit} validationSchema={reviewSchema}>
                  {({ values }) => (
                    <Form className="flex flex-col gap-4 border rounded-none shadow-lg p-4 m-4 w-auto min-[1050px]:w-[1000px]">
                      <CustomTextarea label="Comment" name="comment" />
                      <CustomInput type="number" label="Rating" name="rating" />
                      <button type="submit" disabled={isReviewLoading} className="text-[16px] w-[200px] rounded-md h-[40px] fontCera tracking-wide bg-[#235091] hover:bg-[#0F346C] text-[#fff]">
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Link className="fontCera underline" to={`/users/sign_in?redirect=/market/mealKit/${mealKitId}`}>
                  Please login to write review
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MealKitDetail;
