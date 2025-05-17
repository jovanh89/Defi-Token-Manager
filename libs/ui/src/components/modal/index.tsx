import { FC } from 'react';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../button/button';

interface ModalProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  backButtonText?: string;
  backButtonAction?: () => void;
  confirmButtonText?: string;
  confirmButtonAction?: () => void;
}

export const Modal: FC<ModalProps> = ({
  title,
  description,
  children,
  isOpen,
  setIsOpen,
  backButtonAction,
  backButtonText,
  confirmButtonAction,
  confirmButtonText,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={() => setIsOpen && setIsOpen(false)}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-light-dark/70"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg space-y-4 bg-white dark:bg-light-dark p-8 border-separate rounded-lg border-2 border-solid border-brand"
            >
              <DialogTitle className="text-lg font-bold dark:text-white">
                {title}
              </DialogTitle>
              <Description>{description}</Description>
              {children}

              <div className="flex gap-4 float-end pt-6">
                {backButtonText && (
                  <Button
                    variant="ghost"
                    shape="rounded"
                    onClick={() => backButtonAction && backButtonAction()}
                  >
                    {backButtonText}
                  </Button>
                )}
                {confirmButtonText && (
                  <Button
                    shape="rounded"
                    onClick={() => confirmButtonAction && confirmButtonAction()}
                  >
                    {confirmButtonText}
                  </Button>
                )}
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
