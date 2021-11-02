import { getProviders, signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import Header from '../../Components/Header';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { ThemeState } from '../../atoms/ThemeAtom';

const Signin = ({ providers }) => {
  const [theme] = useRecoilState(ThemeState);
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <section className={theme === 'dark' ? 'dark' : ''}>
      <Header />
      <section className="flex flex-col items-center h-screen pt-8 dark:bg-gray-800 dark:text-gray-100">
        <img
          onClick={handleClick}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          className="cursor-pointer w-80 dark:filter-white"
          alt="logo"
        />

        <p className="italic font-xs">
          This site not a real APP, It is built for learning purpose.
        </p>

        <section className="flex justify-center mt-6">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <GoogleButton
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </GoogleButton>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
};

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}

export default Signin;
