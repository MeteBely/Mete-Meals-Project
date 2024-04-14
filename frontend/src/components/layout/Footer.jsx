import '../../App.css';
import { AiOutlineInstagram } from 'react-icons/ai';
import { BsTiktok } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { BsPinterest } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';
import { useState } from 'react';
import classNames from 'classnames';

const Footer = () => {
  const [iconUp, setIconUp] = useState(''); //mouse ile üzerine gelinen icon'un değerini alır.

  return (
    <footer>
      <section className="bg-[#fafbfc] border-t-[1px] border-[#ECEEF2] pb-8">
        <div className="flex flex-row justify-center items-start gap-10 fontCera">
          <div>
            <h3 className="text-[#303236] text-[14px] text-center tracking-widest mt-[30px] mb-4">FOLLOW US</h3>
            <ul className="flex flex-row  min-[700px]:gap-8 min-[530px]:gap-4 gap-2 justify-center items-center">
              <li onMouseEnter={() => setIconUp('instagram')} onMouseLeave={() => setIconUp('')} className="w-[40px] h-[40px]">
                <a href="https://www.instagram.com/">
                  <AiOutlineInstagram
                    className={classNames({
                      'text-[#6a6d75] transition-all duration-200': true,
                      '-translate-y-2': iconUp === 'instagram',
                    })}
                    color={`${iconUp === 'instagram' ? `#D5307A` : ''}`}
                    size={34}
                  />
                </a>
              </li>
              <li onMouseEnter={() => setIconUp('tiktok')} onMouseLeave={() => setIconUp('')} className="w-[34px] h-[34px]">
                <a href="https://www.tiktok.com/">
                  <BsTiktok
                    className={classNames({
                      'text-[#6a6d75] transition-all duration-200': true,
                      '-translate-y-2': iconUp === 'tiktok',
                    })}
                    color={`${iconUp === 'tiktok' ? '#000' : ''}`}
                    size={28}
                  />
                </a>
              </li>
              <li onMouseEnter={() => setIconUp('facebook')} onMouseLeave={() => setIconUp('')} className="w-[34px] h-[34px]">
                <a href="https://www.facebook.com/">
                  <BsFacebook
                    className={classNames({
                      'text-[#6a6d75] transition-all duration-200': true,
                      '-translate-y-2': iconUp === 'facebook',
                    })}
                    color={`${iconUp === 'facebook' ? `#257BF2` : ''}`}
                    size={28}
                  />
                </a>
              </li>
              <li onMouseEnter={() => setIconUp('pinterest')} onMouseLeave={() => setIconUp('')} className="w-[34px] h-[34px]">
                <a href="https://tr.pinterest.com/">
                  <BsPinterest
                    className={classNames({
                      'text-[#6a6d75] transition-all duration-200': true,
                      '-translate-y-2': iconUp === 'pinterest',
                    })}
                    color={`${iconUp === 'pinterest' ? `#BE2026` : ''}`}
                    size={28}
                  />
                </a>
              </li>
              <li onMouseEnter={() => setIconUp('youtube')} onMouseLeave={() => setIconUp('')} className="w-[41px] h-[41px]">
                <a href="https://www.youtube.com/@metehanmuradoglu3782">
                  <AiFillYoutube
                    className={classNames({
                      'text-[#6a6d75] transition-all duration-200': true,
                      '-translate-y-2': iconUp === 'youtube',
                    })}
                    color={`${iconUp === 'youtube' ? 'red' : ''}`}
                    size={36}
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="min-[1212px]:border-r-[1px] min-[1212px]:border-l-[1px] border-[#e4e6eb] min-[1212px]:px-[120px] text-center text-[#6a6d75] mt-[30px]">
            <h3 className="text-[#303236] text-[14px] tracking-widest mb-4">DISCOVER WHAT&apos;S COOKIN&apos;</h3>
            <input type="email" placeholder="Email Address" className="text-[#6a6d75] h-[42px] mb-4 w-[185px] min-[700px]:w-[275px] px-[15px] py-[10px] text-[14px] rounded-l-[4px] border focus:outline-none" />
            <button className="bg-[#245091] pb-[2px] hover:bg-[#0f346c] text-white h-[42px] w-[40px] min-[700px]:w-[50px] rounded-r-[4px]">GO</button>
            <p className="text-[12px] min-[700px]:text-[14px]">Sign up for offers, recipes, news & more</p>
          </div>
          <div className="hidden min-[1212px]:block">
            <h3 className="text-[#303236] text-[14px] text-center tracking-widest mt-[34px] mb-4">FROM THE BLOG</h3>
            <div className="flex flex-row gap-6 text-[#303236]">
              <a>
                <img className="w-[70px] h-[70px] inline-block rounded-[4px]" src="https://i0.wp.com/blog.blueapron.com/wp-content/uploads/2023/08/Box-Evergreen_Process_2022_200.jpg?resize=100%2C100&ssl=1" />
              </a>
              <a className="text-[14px] hover:underline w-40 cursor-pointer">Etem Meals Continues Environmental, Social and Governance Progress</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f346c] h-auto pb-4">
        <div className="flex flex-row min-[900px]:justify-evenly justify-center items-start pt-12 text-[#a1bce6] text-[14px] fontCera px-2">
          <div className="firstCol flex flex-row gap-12 justify-center items-start">
            <ul className="flex flex-col justify-center items-start gap-3 mr-6">
              <li>
                {' '}
                <a href="/on-the-menu" className="hover:underline">
                  On The Menu
                </a>
              </li>
              <li>
                {' '}
                <a href="/pricing" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                {' '}
                <a href="/market" className="hover:underline">
                  Market
                </a>
              </li>
              <li>
                {' '}
                <a href="/gifts" className="hover:underline">
                  Gift Cards
                </a>
              </li>
              <li>
                {' '}
                <a className="hover:underline cursor-pointer">Lorem, ipsum.</a>
              </li>
              <li>
                {' '}
                <a className="hover:underline cursor-pointer">Lorem, ipsum.</a>
              </li>
              <ul className="max-[899px]:flex flex-col justify-center items-start gap-3 hidden">
                <li>
                  <a className="hover:underline">Suppliers</a>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer">Affiliates</a>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer">Supply Chains Act</a>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer">Food Safety</a>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer">Careers</a>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer">Press</a>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer">Our Team</a>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer">Investor Relations</a>
                </li>
              </ul>
            </ul>
            <ul className="min-[900px]:flex flex-col justify-center items-start gap-3 hidden">
              <li>
                <a className="hover:underline cursor-pointer">Suppliers</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Affiliates</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Supply Chains Act</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Food Safety</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Careers</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Press</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Our Team</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Investor Relations</a>
              </li>
            </ul>
            <ul className="flex flex-col justify-center items-start gap-3">
              <li>
                <a className="hover:underline cursor-pointer">Military & Veterans</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Students</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Graduates</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Teachers</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Seniors (+1)</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Medical Staff</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">First Responders</a>
              </li>
              <ul className="max-[899px]:flex flex-col justify-center items-start gap-3 hidden">
                <li>
                  <span className="text-white">Customer Support:</span>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer">Help Center & FAQ</a>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer">contact@etemmeals.com</a>
                </li>
                <li>
                  <a className="hover:underline cursor-pointer" href="tel:+905452629356">
                    +90 545 262 9356
                  </a>
                </li>
              </ul>
            </ul>
            <ul className="min-[900px]:flex flex-col justify-center items-start gap-3 hidden">
              <li>
                <span className="text-white">Customer Support:</span>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Help Center & FAQ</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">contact@etemmeals.com</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" href="tel:+905452629356">
                  +90 545 262 9356
                </a>
              </li>
            </ul>
          </div>
          <ul className="secondCol flex flex-col justify-center items-end gap-3">
            <li>
              <span className="text-white">© Etem Meals, LLC 2003</span>
            </li>
            <li className=" text-right">
              <a className="hover:underline cursor-pointer">Do Not Sell or Share My Info</a>
            </li>
            <li className="text-right">
              <a className="hover:underline cursor-pointer">Notice to California Residents</a>
            </li>
            <li>
              <a className="hover:underline cursor-pointer">Ad Preferences</a>
            </li>
            <li>
              <a className="hover:underline cursor-pointer">Privacy</a>
            </li>
            <li>
              <a className="hover:underline cursor-pointer">Terms</a>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
