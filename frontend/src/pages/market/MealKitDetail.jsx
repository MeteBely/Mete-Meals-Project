import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../../slices/cartSlice.js';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMealKitDetailsQuery, useCreateReviewMutation } from '../../slices/mealKitsApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import Meta from '../../utils/Meta.jsx';

const MealKitDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: mealKitId } = useParams();

  const [qty, setQty] = useState(1);

  // const [mealKit, setMealKit] = useState({});
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [singleMeals, setSingleMeals] = useState([]);
  const [activeDesc, setActiveDesc] = useState('itemOne');
  const [activeImage, setActiveImage] = useState('');

  const [createReview, { isLoading: isReviewLoading }] = useCreateReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  //İlgili meal kiti url parama göre getirdik.
  const { data: mealKit, refetch, isLoading } = useGetMealKitDetailsQuery(mealKitId);

  //ilgili meal kitteki single mealsleri getirdik.
  useEffect(() => {
    const fetchSingleMeals = async () => {
      let meals = [];
      if (mealKit && mealKit.meals.length > 0) {
        if (mealKit.meals) {
          for (let i = 0; i < mealKit.meals.length; i++) {
            let { data } = await axios.get(`/api/meals/${mealKit.meals[i].meal}`);
            meals.push(data);
          }
          setSingleMeals(meals);
          setActiveImage(meals[0].img);
        }
      }
    };
    fetchSingleMeals();
  }, [mealKit]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...mealKit, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ mealKitId, comment, rating }).unwrap();
      refetch();
      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.message);
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <section className="mt-20">
          <Meta title={mealKit.name} />
          <div className="flex flex-row items-start justify-center gap-8 mb-10">
            <div className="w-[570px]">
              <div className="mb-6">
                <img src={activeImage && activeImage} alt="" />
              </div>
              <div className="flex flex-row flex-wrap gap-4 justify-start items-center">
                {singleMeals.map((singleMeal) => (
                  <button className="w-[130px] h-[130px] cursor-pointer" key={singleMeal._id} onClick={() => setActiveImage(singleMeal.img)}>
                    <img src={singleMeal.img}></img>
                  </button>
                ))}
              </div>
              <div className="mt-10">
                <h2>Reviews</h2>
                {mealKit.reviews && mealKit.reviews.length > 0 ? (
                  mealKit.reviews.map((review) => (
                    <div key={review._id}>
                      <strong>{review.name}</strong>
                      <span>{review.rating}</span>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div>no reviews</div>
                )}
                <h2>Write customer wreview</h2>
                {isReviewLoading && <Loader />}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="flex flex-col my-2">
                      <label htmlFor="rating">rating</label>
                      <input type="number" value={rating} placeholder="Enter rating" id="rating" onChange={(e) => setRating(e.target.value)} />
                    </div>
                    <div className="flex flex-col my-2">
                      <label htmlFor="comment">comment</label>
                      <textarea type="text" value={comment} placeholder="Enter comment" id="comment" onChange={(e) => setComment(e.target.value)} />
                    </div>
                    <button type="submit" disabled={isReviewLoading}>
                      Submit
                    </button>
                  </form>
                ) : (
                  <Link to={`/users/sign_in`}> Please login to write review</Link>
                )}
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
                <p className="mt-4">Order by 12:00 pm ET on Friday, March 15th for delivery the week of March 17th. Requests for order cancellation or changes must be received by Friday, March 15th at 1:00 pm ET — reach out to market@blueapron.com for more information.</p>
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
                <p className={`${activeDesc === 'itemOne' ? 'block text-[#303236] fontCera leading-[1.4] text-[15px] px-4 py-2' : 'hidden'}`}>All the ingredients you need to create two delicious Blue Apron Wellness recipes with easy-to-follow recipe cards and chef tips!</p>
                <p className={`${activeDesc === 'itemTwo' ? 'block text-[#303236] fontCera leading-[1.4] text-[15px] px-4 py-2' : 'hidden'}`}>Order by 12:00 pm ET on Friday, March 15th for delivery the week of March 17th. Requests for order cancellation or changes must be received by Friday, March 15th at 1:00 pm ET — reach out to market@blueapron.com for more information.</p>
                <div className={`${activeDesc === 'itemThree' ? 'block text-[#303236] fontCera leading-[1.4] text-[15px] px-4 py-2' : 'hidden'}`}>
                  <ul className="list-disc pl-2">
                    {singleMeals.map((singleMeal) => (
                      <Link className="cursor-pointer hover:underline inline-block" key={singleMeal._id} to={`/on-the-menu/meal/${singleMeal._id}`}>
                        <li>
                          {singleMeal.name} {singleMeal.subTxt}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MealKitDetail;
