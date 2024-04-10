import { useParams } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import { FaLeaf } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa';
import { useGetMealDetailsQuery } from '../../slices/mealsApiSlice.js';
import Loader from '../../components/common/Loader.jsx';

const MealDetail = () => {
  const { id: mealId } = useParams();
  const { data: meal, isLoading } = useGetMealDetailsQuery(mealId);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section>
            <div className="flex flex-col min-[880px]:flex-row justify-center items-center min-[880px]:items-start gap-8 mt-16 mb-12 px-2">
              <div>
                <img className="h-[500px] w-[500px] min-[880px]:w-[670px] min-[880px]:h-[670px]" src={meal.img} alt="" />
              </div>
              <div className="min-[880px]:w-[500px] w-[450px]">
                <div className="mb-10">
                  <h1 className=" text-[30px] text-[#002c9b] fontChronicle mb-[13px] text-center min-[880px]:text-start">{meal.name}</h1>
                  <h2 className="fontCera text-[18px] text-[#6a6d75] font-light mb-[12px] text-center min-[880px]:text-start">{meal.subTxt}</h2>
                  <div className="mb-[12px] flex flex-row items-center gap-2 ">
                    <span>
                      <FaRegClock color="#00a0df" size={18} />
                    </span>
                    <span className="fontCera text-[15px] text-[#00a0df] tracking-[1px]">{meal.time} MIN</span>
                    <span className={`${meal.isVegetarian ? 'border-r border-[#e4e6eb] h-[22px] mx-2' : ''}`}></span>
                    <span>{meal.isVegetarian ? <FaLeaf color="#1DB392" size={18} /> : ''}</span>
                  </div>
                  <div className="flex flex-row items-center text-[14px]">
                    <span>
                      <FaDollarSign color="#1eb392" size={14} />
                    </span>
                    <span className="text-[#1eb392] font-bold ">{meal.price}/Total</span>
                    <span className="text-[#6a6d75] fontCera ml-2">{meal.numberOfServing} Servings</span>
                  </div>
                </div>
                <div className="mb-10">
                  <h4 className="fontCera text-[#303236] mb-2 text-[20px] font-semibold">From the Test Kitchen</h4>
                  <p className="mb-4 text-[#595959] leading-8">
                    <strong className="">WHY WE LOVE THIS DISH </strong>
                    <br />
                    This comforting dish is packed with a medley of savory, sweet, and spicy flavors! Our umami-rich soy and mushroom broth gets spooned over springy ramen noodles, then topped with pulled chicken (tossed in a sesame-honey glaze), tangy kimchi, marinated jalapeño pepper, and crispy fried onions.
                  </p>
                  <button className="fontCera w-[180px] h-12 bg-orange-500 rounded-sm text-white text-center hover:bg-[#FF8142] tracking-[2px]">SEE PLANS</button>
                </div>
                {meal.dietaryInformation && (
                  <div className="mb-12">
                    <h4 className="mb-4 text-[19px] fontCera font-bold text-[303236] ">Dietary Information</h4>
                    <p className="text-[15px] text-[#595959] mb-2">See nutrition facts for total fat, saturated fat, cholesterol, and sodium information</p>
                    <span className="text-[14px] inline-block text-[#6a6d75] bg-[#f5f6f8] rounded-[4px] fontCera px-[6px] py-[10px]">{meal.dietaryInformation}</span>
                  </div>
                )}
                <div className="mb-12">
                  <div className="flex flex-row justify-between border-b border-[#e4e6eb] pb-4">
                    <span className="text-[19px] text-[#303236] font-bold">Nutrition</span>
                    <span className="text-[14px] text-[#6a6d75] tracking-[1px] ">PER SERVING</span>
                  </div>
                  <div className="flex flex-row justify-between border-b border-[#e4e6eb] py-4">
                    <span className="text-[16px] text-[#424242] font-bold">calories</span>
                    <span className="text-[15px] text-[#424242] tracking-[1px]">630 Cals</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="border-y border-[#e4e6eb] min-[1220px]:w-[1200px] min-[620px]:w-[600px] w-full m-auto pt-8 mb-16 pb-8">
              {meal.recipe && meal.recipe.length !== 0 ? (
                <>
                  {' '}
                  <div className="mb-4 pl-2">
                    <p className="fontChronicle text-[20px] text-[#6a6d75]">step-by-step</p>
                    <h3 className="fontCera text-[30px] font-bold text-[#0f346c] tracking-[0.1em]">INSTRUCTIONS</h3>
                  </div>
                  <div className="flex flex-col min-[1220px]:flex-row flex-wrap items-center justify-center min-[1220px]:justify-start gap-8">
                    {meal.recipe.map((recipeItem) => {
                      return (
                        <div key={recipeItem.step} className=" min-[620px]:w-[580px] w-full flex flex-col justify-start">
                          <img src={recipeItem.image} className="mb-6" />
                          <div className="mb-4 border-b border-[#e4e6eb] pb-4">
                            <span className="bg-[#002684] text-[#ffffff] fontCera text-[15px] text-center w-[12px] px-[14px] py-2 rounded-[50%] ml-2"> {recipeItem.step}</span> <span className="fontCera text-[#303236] w-auto font-semibold">{recipeItem.title}</span>
                          </div>
                          <p className="min-[1220px]:h-[200px] h-auto min-[1220px]:mb-0 mb-2 text-[#303236] fontCera text-[15px] leading-[1.7] px-2">{recipeItem.recipeDescription}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="min-[620px]:w-[600px] w-[480px] m-auto">
                  <h5 className="text-[#002684] text-[30px] tracking-[0.1em] mb-2 fontCera text-center font-semibold">Full recipe coming soon!</h5>
                  <p className="text-[#6a6d75] text-[15px] fontCera text-center">Our culinary team is preparing this recipe.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MealDetail;
