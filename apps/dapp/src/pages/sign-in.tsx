import Image from 'libs/ui/src/assets/images/metamask.svg';
import { useIsMounted } from '@defi-token/ui';
import { useWallet } from '@defi-token/blockchain';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Nav from '../components/layout/nav';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isConnected) navigate('/');
  }, [isConnected, navigate]);

  return (
    <div className="flex max-w-full h-screen flex-col items-center justify-center text-center pt-20">
      <Nav />
      <div className="relative w-[200px] max-w-full sm:w-[250px] xl:w-[300px] 3xl:w-[350px]">
        {isMounted && <img src={Image} alt="404 Error" />}
      </div>
      <h2 className="mb-2 text-base font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:text-xl 3xl:text-2xl">
        Let's Get Started
      </h2>
      <p className="mb-4 max-w-full text-xs leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 sm:w-[430px] sm:text-sm sm:leading-loose">
        Connect your wallet to get started.
      </p>
    </div>
  );
};

export default SignInPage;
