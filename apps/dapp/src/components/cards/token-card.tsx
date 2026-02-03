import React from 'react';
import cn from 'classnames';
import { Loader } from '@defi-token/ui';
import { ETHERSCAN_URL } from '@defi-token/blockchain';

export interface TokenCardProps {
  name: string;
  symbol: string;
  icon: React.ReactElement;
  balance: string;
  allowance?: string;
  contractAddress?: string;
  isBorder?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

const TokenCard: React.FC<TokenCardProps> = ({
  isBorder,
  icon,
  name,
  balance,
  allowance,
  symbol,
  contractAddress,
  isLoading,
  isError,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-lg p-4 lg:flex-row w-full shadow-card h-36 dark:bg-gray-800',
        {
          'border border-solid dark:border-gray-200/10': isBorder,
        }
      )}
    >
      {isLoading && !isError && (
        <div className="w-full flex items-center justify-center">
          <Loader size="medium" />
        </div>
      )}

      {isError && (
        <div className="w-full flex items-center justify-center">
          <h4 className="text-balance font-medium text-red-500 dark:text-red-400">
            Something went wrong
          </h4>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="w-full flex-col">
          <div className="mb-3 flex items-center gap-2">
            {icon}
            <h4 className="text-sm font-medium text-gray-900 ltr:ml-3 rtl:mr-3 dark:text-white">
              {name}
            </h4>
          </div>

          <div className=" text-sm font-medium tracking-tighter text-gray-900 dark:text-white lg:text-lg 2xl:text-xl 3xl:text-2xl">
            {Number(balance) >= 0 ? Number(balance) : 'Error balance'}
            <span className="ml-2">{Number(balance) >= 0 ? symbol : ''}</span>
          </div>

          {allowance && (
            <div
              className={cn(
                'mb-2 truncate tracking-tighter ltr:mr-5 rtl:ml-5 2xl:w-24 3xl:w-auto',
                Number(allowance) > 0 ? 'text-green-500' : 'text-red-500'
              )}
            >
              Allowance:{' '}
              {Number(allowance) >= 0 ? Number(allowance) : 'Error allowance'}{' '}
              {Number(allowance) >= 0 ? symbol : ''}
            </div>
          )}

          {contractAddress && (
            <a
              className="truncate tracking-tighter text-gray-600 dark:text-gray-400 dark:hover:text-brand hover:text-brand ltr:mr-5 rtl:ml-5 2xl:w-24 3xl:w-auto"
              href={`${ETHERSCAN_URL}/address/${contractAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              Contract Information
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenCard;
