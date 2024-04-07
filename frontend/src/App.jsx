import './App.css';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route, Outlet } from 'react-router-dom';
import Pricing from './pages/Pricing.jsx';
import Market from './pages/Market.jsx';
import GiftCards from './pages/GiftCards.jsx';
import Redeem from './pages/Redeem.jsx';
import LogIn from './pages/LogIn.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import SignUp from './pages/SignUp.jsx';
import OnTheMenu from './pages/OnTheMenu.jsx';
import MealDetail from './pages/MealDetail.jsx';
import MealKitDetail from './pages/MealKitDetail.jsx';
import CartPage from './pages/CartPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register.jsx';
import Shipping from './pages/Shipping.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Payment from './pages/Payment.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Order from './pages/Order.jsx';
import Success from './pages/Success.jsx';
import Profile from './pages/Profile.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import MealKitList from './pages/Admin/MealKitList.jsx';
import UpdateMealKit from './pages/Admin/UpdateMealKit.jsx';
import UserList from './pages/Admin/UserList.jsx';
import UserEdit from './pages/Admin/UserEdit.jsx';
import Cancel from './pages/Cancel.jsx';
import SuccessGiftCardPayment from './pages/SuccessGiftCardPayment.jsx';
import RedeemGiftCardBalance from './pages/RedeemGiftCardBalance.jsx';
import SelectMeals from './pages/SelectMeals.jsx';
import Membership from './pages/Membership.jsx';
import MembershipList from './pages/Admin/MembershipList.jsx';
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
        </Route>
        <Route path="/gifts" element={<GiftCards />} />
        <Route path="/pages">
          <Route path="redeem">
            <Route index={true} element={<Redeem />} />
            <Route path="giftcardkeys" element={<RedeemGiftCardBalance />} />
          </Route>
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
