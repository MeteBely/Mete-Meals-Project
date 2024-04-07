import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetMealKitDetailsQuery, useUpdateMealKitMutation } from '../../slices/mealKitsApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { toast } from 'react-toastify';
import UpdateMealKitMeals from '../../components/admin/UpdateMealKitMeals.jsx';
import { useGetMealsQuery } from '../../slices/mealsApiSlice.js';

const UpdateMealKit = () => {
  const { id: mealKitId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [subTxt, setSubTxt] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [meals, setMeals] = useState([]);
  const { data: mealKit, isLoading, error, refetch } = useGetMealKitDetailsQuery(mealKitId);
  const [updateMealKit, { isLoading: loadingUpdate }] = useUpdateMealKitMutation();
  const { data: additionableMeals, isLoading: loadingAdditionableMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'first week' });
  const [additionableMealsContainer, setAdditionableMealsContainer] = useState([]);
  useEffect(() => {
    setAdditionableMealsContainer(additionableMeals);
    refetch();
    if (mealKit) {
      setName(mealKit.name);
      setSubTxt(mealKit.subTxt);
      setPrice(mealKit.price);
      setDescription(mealKit.description);
      setMeals(mealKit.meals);
    }
  }, [mealKit, additionableMeals, refetch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    refetch();
    const updatedMealKit = {
      mealKitId,
      name,
      price,
      subTxt,
      description,
      meals,
    };
    const result = await updateMealKit(updatedMealKit);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Meal Kit successfuly updated!');
      navigate('/admin/mealKitList');
    }
  };

  const clickHandler = (e, meal) => {
    e.preventDefault();
    let newArray = [];
    newArray = additionableMealsContainer.filter((additionableMeal) => additionableMeal._id !== meal._id);
    setAdditionableMealsContainer(newArray);
    const selectedMealId = meal._id;
    setMeals([...meals, { meal: selectedMealId }]);
  };
  return (
    <section>
      <div className="mt-20 px-2">
        <div className="mb-6">
          <Link className="text-[14px] w-auto px-10 py-2 rounded-sm fontCera tracking-widest bg-orange-500 hover:bg-[#FF8142] text-[#fff] fontCera" to="/admin/mealKitList">
            Go Back
          </Link>
        </div>
        <h1 className="text-[32px] tracking-wide text-[#0F346C] fontCera font-semibold">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="flex flex-col mb-2">
              <label htmlFor="name" className="text-[20px]">
                Name
              </label>
              <input className="h-10 border border-[#06316C] rounded-md px-2 focus:outline-[#06316C] w-[250px]" type="text" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="description" className="text-[20px]">
                Description
              </label>
              <textarea className="h-20 border border-[#06316C] rounded-md px-2 focus:outline-[#06316C] w-[1200px]" type="text" value={description} placeholder="Enter description" id="description" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="subTxt" className="text-[20px]">
                Ingredients
              </label>
              <input className="h-10 border border-[#06316C] rounded-md px-2 focus:outline-[#06316C] w-[300px]" type="text" value={subTxt} placeholder="Enter ingredients" id="subTxt" onChange={(e) => setSubTxt(e.target.value)} />
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="price" className="text-[20px]">
                Price
              </label>
              <input className="h-10 border border-[#06316C] rounded-md px-2 focus:outline-[#06316C] w-20" min={0} type="number" value={price} placeholder="Enter price" id="price" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="flex flex-row mb-16 gap-16">
              <label htmlFor="price" className="text-[26px] tracking-wide text-[#0F346C] fontCera font-semibold">
                Meals:
              </label>
              {meals.map((meal) => (
                <UpdateMealKitMeals key={meal.meal} mealId={meal.meal} additionableMealsContainer={additionableMealsContainer} setAdditionableMealsContainer={setAdditionableMealsContainer} setMeals={setMeals} meals={meals} />
              ))}
            </div>
            {loadingAdditionableMeals ? (
              <Loader />
            ) : (
              <div className="flex flex-row gap-12 flex-wrap mb-8">
                <h3 className="text-[24px] tracking-wide text-[#0F346C] fontCera font-semibold">Options:</h3>
                {additionableMealsContainer &&
                  additionableMealsContainer.length > 0 &&
                  additionableMealsContainer.map((meal) => (
                    <div className="w-40" key={meal._id}>
                      <button className="flex flex-col items-center justify-center" onClick={(e) => clickHandler(e, meal)}>
                        <img className="w-[102.5px] h-[102.5px]" src={meal.img} />
                        <p className="text-center fontCera w-40">{meal.name}</p>
                      </button>
                    </div>
                  ))}
              </div>
            )}
            <div>
              <button type="submit" className="text-[18px] w-auto px-12 rounded-sm h-[40px] fontCera tracking-widest bg-[#235091] hover:bg-[#0F346C] text-[#fff] fontCera ml-10 mb-2">
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default UpdateMealKit;
