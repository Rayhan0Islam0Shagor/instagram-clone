import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../../Components/Header';
import Profile from '../../../Components/Profile/Profile';

export default function User() {
  const router = useRouter();

  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>instagram 2.0 | @{router?.query?.user}</title>
        <link rel="icon" href="https://www.instagram.com/favicon.ico" />
      </Head>

      <Header />
      <Profile />
    </div>
  );
}
