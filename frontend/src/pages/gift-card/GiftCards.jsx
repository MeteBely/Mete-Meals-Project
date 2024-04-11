import { useEffect, useState } from 'react';
import GiftCardsFirstCol from '../../components/gift-card/GiftCardsFirstCol.jsx';
import GiftCardsTopPanel from '../../components/gift-card/GiftCardsTopPanel.jsx';
import GiftCardsSecondCol from '../../components/gift-card/GiftCardsSecondCol.jsx';
import GiftCardsThirdCol from '../../components/gift-card/GiftCardsThirdCol.jsx';
import GiftCardsBottomSection from '../../components/gift-card/GiftCardsBottomSection.jsx';
import { clearGiftCardItems } from '../../slices/giftCardSlice.js';
import { useDispatch } from 'react-redux';

const GiftCards = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(140);
  const [quantity, setQuantity] = useState(1);
  const [sumQuantity, setSumQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  //önceden localde tutulan gift cardlar varsa temizlenir.
  useEffect(() => {
    dispatch(clearGiftCardItems());
  }, [dispatch]);

  //cart dizisi değiştiğinde(eklenip çıkartma) totalQuantity fonksiyonu çalıştırılır, toplam gift card sayısı güncel kalır.
  useEffect(() => {
    totalQuantity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  //toplam kaç tane card'ın sepete eklendiğini buraya hesaplıyoruz.
  const totalQuantity = () => {
    let total = 0;
    if (cart.length != 0) {
      cart.map((item) => {
        total += item.quantity;
      });
      setSumQuantity(total);
    } else {
      setSumQuantity(0);
    }
  };

  return (
    <main>
      <section className="mt-[60px] border-t-[1px] border-[#ECEEF2] bg-[#fafbfc]">
        <GiftCardsTopPanel />
        <div className="flex flex-col min-[1250px]:flex-row justify-center min-[1250px]:justify-start items-center min-[1250px]:items-start m-auto w-[62%] mt-12 gap-2 min-[1250px]:gap-12">
          <GiftCardsFirstCol amount={amount} />
          <GiftCardsSecondCol setAmount={setAmount} quantity={quantity} setQuantity={setQuantity} cart={cart} amount={amount} setCart={setCart} />
          <GiftCardsThirdCol sumQuantity={sumQuantity} cart={cart} setCart={setCart} />
        </div>
        <GiftCardsBottomSection />
      </section>
    </main>
  );
};

export default GiftCards;
