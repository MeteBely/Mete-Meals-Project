import { Link, useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCartShopping } from 'react-icons/fa6';
import { useLogoutMutation } from '../../slices/usersApiSlice.js';
import { clearCredentials } from '../../slices/authSlice.js';
import { useGetUserBalanceQuery } from '../../slices/balanceApiSlice.js';
import { useGetMineMembershipIdQuery } from '../../slices/membershipApiSlice.js';
import { FaArrowDown } from 'react-icons/fa';
import classNames from 'classnames';
import apron from '../../assets/icons/apronBlue.png';

const Header = () => {
  const { data: userBalance, isLoading, refetch } = useGetUserBalanceQuery();
  const { data: myMembershipId, isLoading: loadingMembershipId, refetch: refetchMembershipId } = useGetMineMembershipIdQuery();
  const { cartItems } = useSelector((state) => state.cart); //reduxdaki belirli state'yi global çektik.
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  const [menuDropDown, setMenuDropDown] = useState(false);

  // Kullanıcı oturumu açıldığında veya kullanıcı bilgisi güncellendiğinde userBalance verisini güncelle
  useEffect(() => {
    if (userInfo) {
      refetch();
      refetchMembershipId();
    }
  }, [refetch, refetchMembershipId, userInfo]);

  //Logout'a basılınca tetiklenir, backend logout'a istek atılıp cookiedeki jwt temizlenir, localdeki userInfo'da aynı şekilde temizlenir. Home'a yönlendirilir. Dropdown'da tekrar kapatılır.
  const logoutHandler = async () => {
    try {
      setDropDown(!dropDown);
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="w-full h-1">
      <nav className="w-full fixed z-50 bg-white block px-2">
        <div className="navbar flex justify-around min-[550px]:gap-4 gap-2 md:justify-evenly items-center w-full h-16 tracking-widest">
          <div className="flex items-center justify-start">
            <Link to={'/'} className="flex w-[102px] h-12 flex-row items-center gap-1 mr-2">
              <img src={apron} className="min-[550px]:w-12 min-[550px]:h-12 w-10 h-10" />
              <div className="fontCera min-[550px]:text-[20px] font-semibold leading-5">ETEM MEALS</div>
            </Link>
          </div>
          <div className="relative">
            <div className="min-[875px]:hidden">
              <button onClick={() => setMenuDropDown(!menuDropDown)} className="cursor-pointer">
                <IoMenu size={50} color={`#06316C`} />
              </button>
            </div>
            <div
              className={classNames({
                'navbarItemsOne transition-all w-36 min-[875px]:w-auto duration-300 flex flex-col rounded-lg bg-white p-4 absolute left-[-45px] min-[875px]:static min-[875px]:flex-row gap-8 text-coolGray text-xs font-normal items-center': true,
                'top-[58px]': menuDropDown,
                'top-[-800px]': !menuDropDown,
              })}
            >
              <Link to={'/users/sign_in?redirect=/pricing'} className="hover:text-[#0f346c]">
                PLANS
              </Link>
              <Link to={'/on-the-menu'} className="hover:text-[#0f346c] min-w-[102px]">
                ON THE MENU
              </Link>
              <Link to={'/market'} className="hover:text-[#0f346c] ">
                MARKET
              </Link>
              <Link to={'/gifts'} className="hover:text-[#0f346c]">
                GIFT CARDS
              </Link>
            </div>
          </div>
          <div className="navbarItemsTwo flex flex-row min-[600px]:gap-4 gap-1 items-center text-coolGray tracking-widest">
            {userInfo ? (
              <>
                <div className="relative">
                  <div onClick={() => setDropDown(!dropDown)} className="h-16 cursor-pointer text-center w-auto fontCera text-[17px]">
                    <div className="flex flex-row items-center justify-center gap-1 w-full h-full">
                      {userInfo.name}
                      <FaArrowDown color="#0f346c" className={`${dropDown ? 'rotate-180' : 'rotate-0'} transition-all`} />
                    </div>
                  </div>
                  {dropDown && (
                    <div className="absolute flex flex-col items-center justify-center bg-[#0f346c] top-16 left-1/2 -translate-x-2/4 w-40 text-white fontCera p-2 text-[15px] gap-2">
                      <Link onClick={() => setDropDown(!dropDown)} to="/profile" className="hover:bg-[#F5FDE9] hover:text-[#000] w-full flex justify-center">
                        Profile
                      </Link>
                      {!loadingMembershipId && myMembershipId && (
                        <Link onClick={() => setDropDown(!dropDown)} className="hover:bg-[#F5FDE9] hover:text-[#000] w-full flex justify-center" to={`/membership/${myMembershipId._id}`}>
                          Membership
                        </Link>
                      )}
                      {userInfo.isAdmin && (
                        <>
                          <Link onClick={() => setDropDown(!dropDown)} className="w-full flex justify-center hover:bg-[#F5FDE9] hover:text-[#000]" to="/admin/userlist">
                            User List
                          </Link>
                          <Link onClick={() => setDropDown(!dropDown)} className="w-full flex justify-center hover:bg-[#F5FDE9] hover:text-[#000]" to="/admin/orderlist">
                            Order List
                          </Link>
                          <Link onClick={() => setDropDown(!dropDown)} className="w-full flex justify-center hover:bg-[#F5FDE9] hover:text-[#000]" to="/admin/mealKitList">
                            Meal Kit List
                          </Link>
                          <Link onClick={() => setDropDown(!dropDown)} className="w-full flex justify-center hover:bg-[#F5FDE9] hover:text-[#000]" to="/admin/membershiplist">
                            Membership List
                          </Link>
                        </>
                      )}
                      <button className="w-full flex justify-center hover:bg-[#F5FDE9] hover:text-[#000]" onClick={logoutHandler}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>{' '}
                {!isLoading && userBalance && userBalance.balance > 0 && (
                  <div className="fontCera ml-4 min-[550px]:text-[17px] text-[15px]">
                    <span className="mr-1">Balance:</span>${userBalance.balance.toFixed(2)}
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={'/users/sign_in'} className="font-normal w-[60px] text-xs hover:text-[#0f346c]">
                  LOG IN
                </Link>
                <Link to={'/users/sign_up'} className="fontCera text-sm bg-orange-500 text-white w-28 h-10 text-center pt-2.5 rounded hover:bg-[#FF8142] mr-4">
                  SIGN UP
                </Link>
              </>
            )}
            {cartItems && cartItems.length > 0 && (
              <>
                <div className="flex flex-row items-center justify-center w-[120px]">
                  <Link to="/cart">
                    <FaCartShopping color="#06316C" size={34} />
                  </Link>
                  <div className={`bg-[#06316C] ${cartItems.reduce((acc, item) => acc + item.qty, 0) > 9 ? 'w-5 h-5 pr-[1.4px]' : 'w-4 h-4 pr-[0px]'} text-white flex items-center justify-center rounded-[50%] text-[14px] tracking-tighter`}>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
