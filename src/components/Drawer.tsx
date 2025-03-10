import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Simple tooltip component
const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 opacity-90">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

const Drawer: React.FC<DrawerProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width = 'max-w-[360px]' 
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={`pointer-events-auto w-screen ${width}`}>
                  <div className="flex h-full flex-col bg-white border-l border-gray-200">
                    <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <Tooltip text="Close (Esc)">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-1 overflow-hidden">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer; 