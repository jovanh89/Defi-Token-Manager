import { Suspense } from 'react';
import cn from 'classnames';
import ProtectedRoute from '../router/protected-route';
import Nav from './nav';
import WrongNetworkModal from '../modals/wrong-network-modal';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Suspense fallback={null}>
      <ProtectedRoute>
        <div className="flex flex-col w-full min-h-screen pt-24 pb-6 px-6 relative dark:text-white">
          <Nav />
          <div
            className={cn(
              'flex flex-col w-full h-full relative overflow-auto dark:text-white'
            )}
          >
            {children}
          </div>
        </div>
        <WrongNetworkModal />
      </ProtectedRoute>
    </Suspense>
  );
}

export default Layout;
