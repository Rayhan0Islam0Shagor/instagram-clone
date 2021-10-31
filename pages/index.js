import Head from 'next/head';
import Feeds from '../Components/Feeds';
import Header from '../Components/Header';
import Modal from '../Components/Modal/Modal';

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="https://www.instagram.com/favicon.ico" />
      </Head>

      <Header />
      <Feeds />
      <Modal />
    </div>
  );
}
