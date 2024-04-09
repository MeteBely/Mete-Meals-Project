import './App.css';
import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route, Outlet } from 'react-router-dom';
import Pricing from './pages/membership/Pricing.jsx';
import Market from './pages/market/Market.jsx';
import GiftCards from './pages/gift-card/GiftCards.jsx';
import Redeem from './pages/gift-card/Redeem.jsx';
import LogIn from './pages/user-operations/LogIn.jsx';
import ForgotPassword from './pages/user-operations/ForgotPassword.jsx';
import OnTheMenu from './pages/on-the-menus/OnTheMenu.jsx';
import MealDetail from './pages/on-the-menus/MealDetail.jsx';
import MealKitDetail from './pages/market/MealKitDetail.jsx';
import CartPage from './pages/market/CartPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/user-operations/Register.jsx';
import Shipping from './pages/market/Shipping.jsx';
import PrivateRoute from './components/route-controller/PrivateRoute.jsx';
import Payment from './pages/market/Payment.jsx';
import PlaceOrder from './pages/market/PlaceOrder.jsx';
import Order from './pages/market/Order.jsx';
import Success from './pages/market/Success.jsx';
import Profile from './pages/user-operations/Profile.jsx';
import AdminRoute from './components/route-controller/AdminRoute.jsx';
import OrderList from './pages/admin/OrderList.jsx';
import MealKitList from './pages/admin/MealKitList.jsx';
import UpdateMealKit from './pages/admin/UpdateMealKit.jsx';
import UserList from './pages/admin/UserList.jsx';
import UserEdit from './pages/admin/UserEdit.jsx';
import Cancel from './pages/market/Cancel.jsx';
import SuccessGiftCardPayment from './pages/gift-card/SuccessGiftCardPayment.jsx';
import RedeemGiftCardBalance from './pages/gift-card/RedeemGiftCardBalance.jsx';
import SelectMeals from './pages/membership/SelectMeals.jsx';
import Membership from './pages/membership/Membership.jsx';
import MembershipList from './pages/admin/MembershipList.jsx';
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
