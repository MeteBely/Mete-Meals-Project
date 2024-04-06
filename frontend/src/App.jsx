import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import { Routes, Route, Outlet } from 'react-router-dom';
import Pricing from './pages/Pricing';
import Market from './pages/Market';
import MealKits from './pages/MealKits';
import SeasonalBoxes from './pages/SeasonalBoxes';
import GiftCards from './pages/GiftCards';
import Redeem from './pages/Redeem';
import CorporateSales from './pages/CorporateSales';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import OnTheMenu from './pages/OnTheMenu';
import MealDetail from './pages/MealDetail';
import MealKitDetail from './pages/MealKitDetail';
import CartPage from './pages/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import PrivateRoute from './components/PrivateRoute';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import Success from './pages/Success';
import Profile from './pages/Profile';
import AdminRoute from './components/AdminRoute';
import OrderList from './pages/Admin/OrderList';
import MealKitList from './pages/Admin/MealKitList';
import UpdateMealKit from './pages/Admin/UpdateMealKit';
import UserList from './pages/Admin/UserList';
import UserEdit from './pages/Admin/UserEdit';
import Cancel from './pages/Cancel';
import SuccessGiftCardPayment from './pages/SuccessGiftCardPayment';
import RedeemGiftCardBalance from './pages/RedeemGiftCardBalance';
import SelectMeals from './pages/SelectMeals';
import Membership from './pages/Membership';
import MembershipList from './pages/Admin/MembershipList';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/success/order/:id" element={<Success />} />
          <Route path="/cancel/order/:id" element={<Cancel />} />
          <Route path="/success/membership/selectmeals" element={<SelectMeals />} />
          <Route path="/cancel/membership" element={<Cancel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/membership/:id" element={<Membership />} />
        </Route>

        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<OrderList />} />
          <Route path="/admin/mealKitList" element={<MealKitList />} />
          <Route path="/admin/mealKit/:id/edit" element={<UpdateMealKit />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/user/:id/edit" element={<UserEdit />} />
          <Route path="/admin/membershiplist" element={<MembershipList />} />
        </Route>

        <Route path="/success/giftCardOrder" element={<SuccessGiftCardPayment />} />
        <Route path="/cancel/giftCardOrder" element={<Cancel />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/on-the-menu">
          <Route index={true} element={<OnTheMenu />} />
          <Route path="meal/:id" element={<MealDetail />} />
        </Route>
        <Route path="/market">
          <Route index={true} element={<Market />} />
          <Route path="mealKit/:id" element={<MealKitDetail />} />
          <Route path="categories">
            <Route index={true} element={<Outlet />} />
            <Route path="seasonal-boxes" element={<SeasonalBoxes />} />
            <Route path="meal-kits" element={<MealKits />} />
          </Route>
        </Route>
        <Route path="/gifts" element={<GiftCards />} />
        <Route path="/pages">
          <Route path="redeem">
            <Route index={true} element={<Redeem />} />
            <Route path="giftcardkeys" element={<RedeemGiftCardBalance />} />
          </Route>
          <Route path="corporate-sales" element={<CorporateSales />} />
        </Route>
        <Route path="/users">
          <Route index={true} element={<Outlet />} />
          <Route path="sign_in" element={<LogIn />} />
          <Route path="sign_up" element={<Register />} />
          {/* <Route path="sign_up" element={<SignUp />} /> */}
          <Route path="password">
            <Route index={true} element={<Outlet />} />
            <Route path="new" element={<ForgotPassword />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
