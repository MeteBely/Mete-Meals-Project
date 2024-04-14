import chefHatBlack from '../assets/icons/chefHatBlack.png';
import chefHat from '../assets/icons/chefHat.png';
import leafBlack from '../assets/icons/leafBlack.png';
import leaf from '../assets/icons/leaf.png';
import lessCal from '../assets/icons/lessCal.png';
import lessCalBlue from '../assets/icons/lessCalBlue.png';
import lessCarbBlack from '../assets/icons/lessCarbBlack.png';
import lessCarb from '../assets/icons/lessCarb.png';
import veggiesBlack from '../assets/icons/veggiesBlack.jpg';
import veggies from '../assets/icons/veggies.png';

const mealPreferences = [
  {
    title: 'Chef Favorites',
    description: "Our test kitchen's top picks",
    img: chefHatBlack,
    imgBlue: chefHat,
    preference: "nutritionist's pick",
  },
  {
    title: 'High Protein',
    description: 'Eat for your muscles bruh',
    img: leafBlack,
    imgBlue: leaf,
    preference: '45g of protein',
  },
  {
    title: 'Less Calories',
    description: 'Eat our less calories meals and stay always fit',
    img: lessCal,
    imgBlue: lessCalBlue,
    preference: '600 calories or less',
  },
  {
    title: 'Less Carb',
    description: 'If you are in the diet, this is the best option for your body',
    img: lessCarbBlack,
    imgBlue: lessCarb,
    preference: 'carb conscious',
  },
  {
    title: 'Veggies',
    description: 'Meat-free meals highlighting seasonally inspired produce',
    img: veggiesBlack,
    imgBlue: veggies,
    preference: 'vegetarian',
  },
];

export default mealPreferences;
