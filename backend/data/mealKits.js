const mealKits = [
  {
    name: 'Premium Meal Kit',
    subTxt: 'Includes 3 recipes, 2 servings each',
    price: 124.99,
    description: 'Step up your skills and enjoy specialty ingredients with 3 recipes that make any evening exceptional—no subscription required. Each recipe serves 2, is uniquely crafted by our Test Kitchen, and includes specialty protein combinations, advanced culinary techniques, and unique flavor twists.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf98ec',
      },
      {
        meal: '65e8b4aa51ce552470bf98e0',
      },
      {
        meal: '65e8b4aa51ce552470bf98fd',
      },
    ],
  },
  {
    name: 'Fast & Easy Meal Kit',
    subTxt: 'Includes 3 recipes, 2 servings each',
    price: 79.99,
    description: 'Short on time? These delicious meals feature a variety of seasonal ingredients and can be prepared in a snap—no subscription required. Enjoy 3 of our Signature recipes, made with a selection of meat, poultry, seafood, and seasonally inspired ingredients. Each recipe serves 2, is uniquely crafted by our Test Kitchen, and can be prepared in as little as 35 minutes.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf992f',
      },
      {
        meal: '65e8b4aa51ce552470bf9929',
      },
      {
        meal: '65e8b4aa51ce552470bf98f2',
      },
    ],
  },
  {
    name: 'Customer Favorites Meal Kit',
    subTxt: 'Includes 3 recipes, 2 servings each',
    price: 79.99,
    description: 'Try 3 signature recipes that are always a hit with our home cooks—no subscription required! Each recipe makes 2 servings, includes seasonally inspired ingredients, and features the easy-to-follow steps that people love about Blue Apron.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf9904',
      },
      {
        meal: '65e8b4aa51ce552470bf992f',
      },
      {
        meal: '65e8b4aa51ce552470bf98e9',
      },
    ],
  },
  {
    name: 'Customer Favorites Family Meal Kit',
    subTxt: 'Includes 2 recipes, 4 servings each',
    price: 94.99,
    description: 'Perfect for family, guests, or having leftovers, these recipes are always a hit with our home cooks—no subscription required! Featuring 2 of our Signature recipes, this meal kit includes a selection of meat, poultry, seafood, and seasonally inspired ingredients. Each recipe makes 4 servings, is crafted by our Test Kitchen.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf9977',
      },
      {
        meal: '65e8b4aa51ce552470bf99a2',
      },
    ],
  },
  {
    name: 'Pescatarian & Vegetarian Meal Kit',
    subTxt: 'Includes 3 recipes, 2 servings each',
    price: 79.99,
    description: 'These top picks feature a selection of our favorite pescatarian and vegetarian meals for 2 —no subscription required. Our Pescatarian recipes feature a wide array of nutritious seafood options like salmon, cod, tilapia, crab, and shrimp. While these dishes never contain meat, pork or poultry, they may contain animal-derived ingredients such as milk, butter, cheese and/or honey.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf98f8',
      },
      {
        meal: '65e8b4aa51ce552470bf9909',
      },
      {
        meal: '65e8b4aa51ce552470bf991c',
      },
    ],
  },
  {
    name: 'Wellness Meal Kit',
    subTxt: 'Includes 3 recipes, 2 servings each',
    price: 79.99,
    description: 'Enjoy 3 nutritionist-approved recipes designed with a holistic approach to health- no subscription required. Each balanced recipe makes 2 servings of wholesome, flavorful meals and can help you meet your unique goals.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf9910',
      },
      {
        meal: '65e8b4aa51ce552470bf9922',
      },
      {
        meal: '65e8b4aa51ce552470bf98fd',
      },
    ],
  },
  {
    name: 'Ready to Cook Meal Kit',
    subTxt: 'Includes 2 recipes, 2 servings each',
    price: 60.99,
    description: 'Try 2 Blue Apron Ready to Cook recipes. Recipes with most of the prep done for you. Cooked in a recyclable baking tray, these 2 meals make cleanup a breeze. Just assemble, bake, and enjoy! Each recipe is perfectly portioned for 2 people. No subscription required! Each recipe makes 2 servings, includes seasonally inspired ingredients, and features the easy-to-follow steps that people love about Blue Apron.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf98e9',
      },
      {
        meal: '65e8b4aa51ce552470bf98e5',
      },
    ],
  },
  {
    name: 'Wellness Meal Kit: 600 Calories or Less',
    subTxt: 'Includes 2 recipes, 2 servings each',
    price: 60.99,
    description: 'Try 2 of our Blue Apron Wellness recipes that are always a hit with our home cooks—no subscription required! Each meal contains 600 calories or less per serving. Each recipe makes 2 servings, includes seasonally inspired ingredients, and features the easy-to-follow steps that people love about Blue Apron.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf9922',
      },
      {
        meal: '65e8b4aa51ce552470bf98fd',
      },
    ],
  },
  {
    name: 'Wellness Meal Kit: 45 Grams of Protein',
    subTxt: 'Includes 2 recipes, 2 servings each',
    price: 60.99,
    description: 'Try 2 of our Blue Apron Wellness recipes that are always a hit with our home cooks—no subscription required! Each meal kit recipe contains 45g or more of protein per serving, and are ideal for those looking to focus their meals around protein intake. Each recipe makes 2 servings, includes seasonally inspired ingredients, and features the easy-to-follow steps that people love about Blue Apron.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf98f2',
      },
      {
        meal: '65e8b4aa51ce552470bf9934',
      },
    ],
  },
  {
    name: 'Prepared & Ready 8 Pack Bundle',
    subTxt: 'featuring 4 different recipes, 2 trays of each',
    price: 87.92,
    description: 'Our fresh take on pre-made meals delivers ultimate convenience as well as chef-crafted quality and variety. These delicious, non-frozen meals arrive chilled to ensure freshness and are ready to reheat in minutes. In this Prepared & Ready Bundle, you’ll receive 8 single-serve trays of a chef-designed meal that are ready to eat in under 5 minutes. With Blue Apron Prepared & Ready meals, you don’t have to sacrifice quality for convenience. Each pre-portioned meal features thoughtfully sourced ingredients—delivering the quality and flavor Blue Apron is known for, just without the prep time.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf99f4',
      },
      {
        meal: '65e8b4aa51ce552470bf99f8',
      },
      {
        meal: '65e8b4aa51ce552470bf99f2',
      },
      {
        meal: '65e8b4aa51ce552470bf99f6',
      },
    ],
  },
  {
    name: 'Prepared & Ready 4 Pack Bundle',
    subTxt: 'featuring 2 different recipes, 2 trays of each',
    price: 43.96,
    description: 'Our fresh take on pre-made meals delivers ultimate convenience as well as chef-crafted quality and variety. These delicious, non-frozen meals arrive chilled to ensure freshness and are ready to reheat in minutes. In this Prepared & Ready Bundle, you’ll receive 4 single-serve trays of a chef-designed meal that are ready to eat in under 5 minutes. With Blue Apron Prepared & Ready meals, you don’t have to sacrifice quality for convenience. Each pre-portioned meal features thoughtfully sourced ingredients—delivering the quality and flavor Blue Apron is known for, just without the prep time.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf99f4',
      },
      {
        meal: '65e8b4aa51ce552470bf99f6',
      },
    ],
  },
  {
    name: 'Prepared & Ready 4 Pack Bundle',
    subTxt: 'featuring 2 different recipes, 2 trays of each',
    price: 43.96,
    description: 'Our fresh take on pre-made meals delivers ultimate convenience as well as chef-crafted quality and variety. These delicious, non-frozen meals arrive chilled to ensure freshness and are ready to reheat in minutes. In this Prepared & Ready Bundle, you’ll receive 4 single-serve trays of a chef-designed meal that are ready to eat in under 5 minutes. With Blue Apron Prepared & Ready meals, you don’t have to sacrifice quality for convenience. Each pre-portioned meal features thoughtfully sourced ingredients—delivering the quality and flavor Blue Apron is known for, just without the prep time.',
    meals: [
      {
        meal: '65e8b4aa51ce552470bf99f8',
      },
      {
        meal: '65e8b4aa51ce552470bf99f2',
      },
    ],
  },
];

export default mealKits;
