import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../../Components/Header';
import Profile from '../../../Components/Profile/Profile';
import { useRecoilState } from 'recoil';
import { ThemeState } from '../../../atoms/ThemeAtom';

export default function User() {
  const router = useRouter();
  const [theme] = useRecoilState(ThemeState);

  return (
    <section className={theme === 'dark' ? 'dark' : ''}>
      <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide dark:bg-gray-800">
        <Head>
          <title>instagram 2.0 | @{router?.query?.user}</title>
          <link rel="icon" href="https://www.instagram.com/favicon.ico" />
        </Head>

        <Header />
        <Profile />
      </div>
    </section>
  );
}
