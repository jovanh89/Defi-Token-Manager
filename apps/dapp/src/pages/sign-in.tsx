import DTM from 'libs/ui/src/assets/images/DTM.png';
import { useWallet } from '@defi-token/blockchain';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Nav from '../components/layout/nav';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();

  useEffect(() => {
    if (isConnected) navigate('/');
  }, [isConnected, navigate]);

  return (
    <div
      className="flex max-w-full h-screen flex-col items-center justify-center text-center pt-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${DTM})` }}
    >
      <Nav />
    </div>
  );
};

export default SignInPage;
