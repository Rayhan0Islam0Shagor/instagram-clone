import { getProviders, signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import Header from '../../Components/Header';
import { useRouter } from 'next/router';

const Signin = ({ providers }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <>
      <Header />

      <section className="flex flex-col items-center mt-8">
        <img
          onClick={handleClick}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          className="cursor-pointer w-80"
          alt="logo"
        />

        <p className="italic font-xs">
          This site not a real APP, It is built for learning purpose.
        </p>
      </section>

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
    </>
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
