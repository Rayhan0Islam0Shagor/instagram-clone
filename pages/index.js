import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { ThemeState } from '../atoms/ThemeAtom';
import Feeds from '../Components/Feeds';
import Header from '../Components/Header';
import Modal from '../Components/Modal/Modal';

export default function Home() {
  const [theme] = useRecoilState(ThemeState);

  return (
    <section className={theme === 'dark' ? 'dark' : ''}>
      <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide dark:bg-gray-800">
        <Head>
          <title>Instagram 2.0</title>
          <link rel="icon" href="https://www.instagram.com/favicon.ico" />
        </Head>

        <Header />
        <Feeds />
        <Modal />
      </div>
    </section>
  );
}
