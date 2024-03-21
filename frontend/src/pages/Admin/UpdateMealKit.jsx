import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetMealKitDetailsQuery, useUpdateMealKitMutation } from '../../slices/mealKitsApiSlice';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import UpdateMealKitMeals from '../../components/UpdateMealKitMeals';
import { useGetMealsQuery } from '../../slices/mealsApiSlice';

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
  const { data: additionableMeals, isLoading: loadingAdditionableMeals } = useGetMealsQuery({ numberOfServing: 'x', date: 'March 11th' });
  const [additionableMealsContainer, setAdditionableMealsContainer] = useState([]);
  useEffect(() => {
    setAdditionableMealsContainer(additionableMeals);
    if (mealKit) {
      setName(mealKit.name);
      setSubTxt(mealKit.subTxt);
      setPrice(mealKit.price);
      setDescription(mealKit.description);
      setMeals(mealKit.meals);
    }
  }, [mealKit, additionableMeals]);

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
    <>
      <Link to="/admin/mealKitList">Go Back</Link>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <form action="" onSubmit={(e) => submitHandler(e)}>
          <div className="flex flex-col my-2">
            <label htmlFor="name">Name</label>
            <input type="text" value={name} placeholder="Enter name" id="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="description">Description</label>
            <textarea type="text" value={description} placeholder="Enter description" id="description" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="subTxt">Ingredients</label>
            <input type="text" value={subTxt} placeholder="Enter ingredients" id="subTxt" onChange={(e) => setSubTxt(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="price">Price</label>
            <input type="number" value={price} placeholder="Enter price" id="price" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="flex flex-row my-2 gap-4">
            {meals.map((meal) => (
              <UpdateMealKitMeals key={meal.meal} mealId={meal.meal} additionableMealsContainer={additionableMealsContainer} setAdditionableMealsContainer={setAdditionableMealsContainer} setMeals={setMeals} meals={meals} />
            ))}
          </div>
          {loadingAdditionableMeals ? (
            <Loader />
          ) : (
            <div className="flex flex-row my-2 gap-4">
              {additionableMealsContainer &&
                additionableMealsContainer.length > 0 &&
                additionableMealsContainer.map((meal) => (
                  <div className="w-40" key={meal._id}>
                    <button onClick={(e) => clickHandler(e, meal)}>
                      <img src={meal.img} />
                      <p>{meal.name}</p>
                    </button>
                  </div>
                ))}
            </div>
          )}
          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateMealKit;
