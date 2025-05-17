import ErrorLightImage from 'libs/ui/src/assets/images/404-light.svg';
import ErrorDarkImage from 'libs/ui/src/assets/images/404-dark.svg';
import { Button, useIsMounted, useTheme } from '@defi-token/ui';
import { useWallet } from '@defi-token/blockchain';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Nav from '../components/layout/nav';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const isMounted = useIsMounted();
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';

  useEffect(() => {
    if (isConnected) navigate('/');
  }, [isConnected, navigate]);

  return (
    <div className="flex max-w-full h-screen flex-col items-center justify-center text-center pt-20">
      <Nav />
      <div className="relative w-52 max-w-full sm:w-[400px] xl:w-[450px] 3xl:w-[500px]">
        {isMounted && !isDarkMode && (
          <img src={ErrorLightImage} alt="404 Error" />
        )}
        {isMounted && isDarkMode && (
          <img src={ErrorDarkImage} alt="404 Error" />
        )}
      </div>

      <h2 className="mb-2 mt-5 text-base font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:mt-10 sm:text-xl 3xl:mt-12 3xl:text-2xl">
        Error! No Result Found
      </h2>
      <p className="mb-4 max-w-full text-xs leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 sm:w-[430px] sm:text-sm sm:leading-loose">
        Sorry, the page you are looking for might be renamed, removed, or might
        never exist.
      </p>
      <Button shape="rounded" onClick={() => navigate('/')}>
        Go To Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
