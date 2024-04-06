import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCartShopping } from 'react-icons/fa6';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { clearCredentials } from '../slices/authSlice.jsx';
import { useGetUserBalanceQuery } from '../slices/balanceApiSlice.jsx';
import { useGetMineMembershipIdQuery } from '../slices/membershipApiSlice.jsx';

const Header = () => {
  const { data: userBalance, isLoading, refetch } = useGetUserBalanceQuery();
  const { data: myMembershipId, refetch: refetchMembershipId } = useGetMineMembershipIdQuery();
  const { cartItems } = useSelector((state) => state.cart); //reduxdaki belirli state'yi global çektik.
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [topPos, setTopPos] = useState('top-[-800px]');
  const [dropDown, setDropDown] = useState(false);
  const bringItems = () => {
    if (topPos === 'top-[-800px]') {
      setTopPos('top-[58px]');
    } else {
      setTopPos('top-[-800px]');
    }
  };

  useEffect(() => {
    refetchMembershipId();
  }, [refetchMembershipId, myMembershipId]);

  useEffect(() => {
    if (userInfo) {
      // Kullanıcı oturumu açıldığında veya kullanıcı bilgisi güncellendiğinde userBalance verisini güncelle
      refetch(); // veya useGetUserBalanceQuery().refetch() gibi bir kullanım, hook'tan dönen refetch fonksiyonunu kullanarak
    }
  }, [refetch, userInfo]);

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="w-full h-1">
      <nav className="w-full fixed z-50 bg-white block">
        <div className="navbar flex justify-around gap-[40px] md:justify-evenly items-center w-full h-16 tracking-widest">
          <div className="flex items-center">
            <a href="" className="" onClick={() => navigate('/')}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Blue_Apron_logo.svg/1280px-Blue_Apron_logo.svg.png" className="w-[102px] h-12" />
            </a>
          </div>
          <div className="relative">
            <div className="md:hidden">
              <button onClick={bringItems} className="cursor-pointer">
                <IoMenu size={50} color={`#06316C`} />
              </button>
            </div>
            <div className={`navbarItemsOne transition-all w-36 md:w-auto duration-300 flex flex-col rounded-lg bg-white p-4 absolute ${topPos} left-[-45px] md:static md:flex-row gap-8 text-coolGray text-xs font-normal items-center`}>
              <a href="" onClick={() => navigate('/users/sign_in?redirect=/pricing')} className="hover:text-[#0f346c]">
                PLANS
              </a>
              <a href="" onClick={() => navigate('/on-the-menu')} className="hover:text-[#0f346c] min-w-[102px]">
                ON THE MENU
              </a>
              <a href="" onClick={() => navigate('/market')} className="hover:text-[#0f346c] ">
                MARKET
              </a>
              <a href="" onClick={() => navigate('/gifts')} className="hover:text-[#0f346c]">
                GIFT CARDS
              </a>
            </div>
          </div>

          <div className="navbarItemsTwo flex flex-row gap-4 items-center text-coolGray tracking-widest">
            {userInfo ? (
              <>
                <div className="relative">
                  <div onClick={() => setDropDown(!dropDown)} className="cursor-pointer text-center w-32 fontCera text-[17px]">
                    {userInfo.name}
                  </div>
                  {dropDown && (
                    <div className="absolute flex flex-col items-center justify-start bg-[#0f346c] top-[44px] left-0 w-40 text-white fontCera p-2 text-[15px] gap-2">
                      <Link to="/profile">Profile</Link>
                      {myMembershipId && <Link to={`/membership/${myMembershipId._id}`}>Membership</Link>}
                      {userInfo.isAdmin && (
                        <>
                          <Link to="/admin/userlist">User List</Link>
                          <Link to="/admin/orderlist">Order List</Link>
                          <Link to="/admin/mealKitList">Meal Kit List</Link>
                          <Link to="/admin/membershiplist">Membership List</Link>
                        </>
                      )}
                      <button onClick={logoutHandler}>Logout</button>
                    </div>
                  )}
                </div>{' '}
                {!isLoading && userBalance && userBalance.balance > 0 && (
                  <div className="fontCera">
                    <span className="mr-1 text-[17px]">Balance:</span>${userBalance.balance}
                  </div>
                )}
              </>
            ) : (
              <>
                <a href="" onClick={() => navigate('/users/sign_in')} className="font-normal w-[60px] text-xs hover:text-[#0f346c]">
                  LOG IN
                </a>
                <a href="" className="fontCera text-sm bg-orange-500 text-white w-28 h-10 text-center pt-2.5 rounded hover:bg-[#FF8142] mr-4">
                  SIGN UP
                </a>
              </>
            )}
            {cartItems && cartItems.length > 0 ? (
              <>
                <div className="flex flex-row items-center justify-center w-[120px]">
                  <Link to="/cart">
                    <FaCartShopping color="#06316C" size={34} />
                  </Link>
                  <div className={`bg-[#06316C] ${cartItems.reduce((acc, item) => acc + item.qty, 0) > 9 ? 'w-5 h-5 pr-[1.4px]' : 'w-4 h-4 pr-[0px]'} text-white flex items-center justify-center rounded-[50%] text-[14px] tracking-tighter`}>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
