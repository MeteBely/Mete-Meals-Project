import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetMealKitDetailsQuery, useUpdateMealKitMutation } from '../../slices/mealKitsApiSlice.js';
import Loader from '../../components/common/Loader.jsx';
import { toast } from 'react-toastify';
import UpdateMealKitMeals from '../../components/admin/UpdateMealKitMeals.jsx';
import { useGetMealsQuery } from '../../slices/mealsApiSlice.js';
import { Form, Formik } from 'formik';
import CustomInput from '../../components/form-components/CustomInput.jsx';
import CustomTextarea from '../../components/form-components/CustomTextarea.jsx';
import { MealKitSchema } from '../../Schemas/MealKitSchema.js';

const UpdateMealKit = () => {
  const { id: mealKitId } = useParams();
  const { data: mealKit, isLoading, error, refetch } = useGetMealKitDetailsQuery(mealKitId);
  const { data: additionableMeals, isLoading: loadingAdditionableMeals } = useGetMealsQuery({ numberOfServing: '2', date: 'first week' });
  const [updateMealKit, { isLoading: loadingUpdate }] = useUpdateMealKitMutation();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [additionableMealsContainer, setAdditionableMealsContainer] = useState([]);

  //Meal kitimizin içinde halihazırda bulunan mealler, eğer ekleyebileceğimiz additionableMeals içerlerinde de varsa, additionableMeals içerisinden çıkarılırlar. Çünkü zaten halihazırda selected haldeler. Bu fonksiyonun amacı bu mealleri bulup çıkartmaktır.
  useEffect(() => {
    const seperateMeals = () => {
      let newArray = [];
      let flag = true;
      additionableMeals.map((additionableMeal) => {
        mealKit.meals.map((mealObj) => {
          if (additionableMeal._id === mealObj.meal._id) {
            flag = false;
          }
        });
        console.log(flag);
        if (flag) {
          newArray.push(additionableMeal);
        }
        flag = true;
      });
      return newArray;
    };
    setAdditionableMealsContainer(mealKit?.meals && additionableMeals && additionableMeals.length > 0 ? seperateMeals : additionableMeals);
    setMeals(mealKit?.meals || []);
    refetch();
  }, [mealKit, additionableMeals, refetch]);

  //additionableMealsContainer içerisinde bir meale basılırsa bu fonk tetiklenir, amacı meal'i additionableMealsContainer içerisinden silip meals dizisine eklemekdir.
  const clickHandler = (e, meal) => {
    e.preventDefault();
    let newArray = [];
    newArray = additionableMealsContainer.filter((additionableMeal) => additionableMeal._id !== meal._id);
    setAdditionableMealsContainer(newArray);
    const selectedMeal = meal;
    setMeals([...meals, { meal: selectedMeal }]);
  };

  //form submit olunca tetiklenir, meal kiti günceller.
  const onSubmit = async (values, actions) => {
    refetch();
    const updatedMealKit = {
      mealKitId,
      meals,
      ...values,
    };
    const result = await updateMealKit(updatedMealKit);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Meal Kit successfuly updated!');
      navigate('/admin/mealKitList');
    }
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
          <Formik initialValues={{ name: mealKit.name, description: mealKit.description, subTxt: mealKit.subTxt, price: mealKit.price }} onSubmit={onSubmit} validationSchema={MealKitSchema}>
            {({ isSubmitting, values }) => (
              <Form className="flex flex-col gap-4 border rounded-none shadow-lg p-4 m-4">
                <CustomInput label="Name" name="name" />
                <CustomTextarea label="Description" name="description" />
                <CustomInput label="Ingredients" name="subTxt" />
                <CustomInput type="number" label="Price" name="price" />
                <div className="flex flex-wrap mb-16 gap-16">
                  <label htmlFor="price" className="text-[26px] tracking-wide text-[#0F346C] fontCera font-semibold">
                    Meals:
                  </label>
                  {meals.map((meal) => (
                    <>
                      <UpdateMealKitMeals key={meal.meal._id} mealId={meal.meal._id} additionableMealsContainer={additionableMealsContainer} setAdditionableMealsContainer={setAdditionableMealsContainer} setMeals={setMeals} meals={meals} />
                    </>
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
              </Form>
            )}
          </Formik>
        )}
      </div>
    </section>
  );
};

export default UpdateMealKit;
