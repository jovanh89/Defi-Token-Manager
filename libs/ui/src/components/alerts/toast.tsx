import React, { useCallback, useEffect, useState } from 'react';
import { useToastStore, IToast } from '../../hooks/use-toast-store';
import { Close } from '../icons/close';
import Button from '../button/button';

const Toast: React.FC = () => {
  const { toasts, dismissToast } = useToastStore();
  const [visibleToasts, setVisibleToasts] = useState<IToast[]>([]);

  const handleVariant = (variant: IToast['variant']) =>
    variant === 'destructive'
      ? 'border-red-500 bg-red-500 text-white'
      : variant === 'success'
      ? 'border-green-500 bg-green-500 text-white'
      : variant === 'warning'
      ? 'border-yellow-500 bg-yellow-500 text-white'
      : variant === 'info'
      ? 'border-blue-500 bg-blue-500 text-white'
      : 'border-gray-300 bg-white p-4 shadow-card dark:bg-light-dark';

  const handleDismiss = useCallback(
    (toast: IToast) => {
      setVisibleToasts((prevToasts) =>
        prevToasts.map((t) =>
          t.id === toast.id ? { ...t, dismissing: true } : t
        )
      );
      setTimeout(() => {
        dismissToast(toast.id);
      }, toast.timeout || 5000);
    },
    [dismissToast]
  );

  useEffect(() => {
    setVisibleToasts(toasts);
    const timers = toasts.map((toast) => {
      const timer = setTimeout(() => {
        handleDismiss(toast);
      }, toast.timeout || 5000);
      return { id: toast.id, timer };
    });
    return () => {
      timers.forEach(({ timer }) => clearTimeout(timer));
    };
  }, [toasts, handleDismiss]);

  return (
    <ul className="fixed bottom-4 right-4 sm:pl-4 pl-8 flex flex-col gap-2 sm:w-auto w-full z-20">
      {visibleToasts.map((toast, index) => (
        <li
          key={index}
          className={`relative flex items-center justify-between space-x-2 border-gray-300 p-4 pr-6 rounded-md shadow-lg transform transition-all duration-500 ease-in-out 
            ${toast.dismissing ? 'translate-x-full -mr-6' : 'translate-x-0'} 
            ${handleVariant(toast.variant)}`}
        >
          <div className="flex flex-col gap-1">
            <span className="dark:text-light mb-1 font-semibold text-md">
              {toast.title}
            </span>
            <span className="dark:text-light mr-3 font-normal text-sm word-break-all">
              {toast.message?.split('\n')?.map((line, index) => (
                <span key={index}>
                  {line}
                  <div className="h-1" />
                </span>
              ))}
            </span>
            {toast?.button?.label && (
              <Button
                className="mt-2"
                variant="ghost"
                shape="rounded"
                color="white"
                onClick={toast.button.onClick}
                size="mini"
              >
                <span className="text-white">{toast.button?.label}</span>
              </Button>
            )}
          </div>
          <button
            className=" absolute right-3 top-3"
            onClick={() => handleDismiss(toast)}
          >
            <Close />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Toast;
