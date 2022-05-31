import { Fragment } from "react";
import { XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";

export type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  title?: string;
  describe?: string;
  children?: React.ReactNode;
};

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  describe,
  className = "",
  children,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${className}`}
        onClose={() => onClose && onClose()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-100 bg-opacity-20" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden relative rounded-2xl bg-brand-black2 p-6 text-left align-middle shadow-xl transition-all">
                <button
                  className="absolute top-6 right-6 cursor-pointer"
                  onClick={() => onClose && onClose()}
                >
                  <XIcon className="h-4 w-4 text-gray-400" />
                </button>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-brand-gray3"
                >
                  {title}
                </Dialog.Title>
                {Boolean(describe) && (
                  <div className="mt-2">
                    <p className="text-sm text-brand-gray2">{describe}</p>
                  </div>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalComponent;
