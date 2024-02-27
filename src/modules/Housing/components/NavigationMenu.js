import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { mergeClassName } from '@/lib';

const NavigationMenu = ({ name, navigationOption }) => {
  return (
    <Menu as="div" className="relative inline-flex items-center">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className="flex items-center justify-between gap-x-3"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <div className="flex items-center justify-center">{name}</div>
              <ChevronDownIcon
                className={mergeClassName('w-4 h-4 stroke-gray-500', {
                  '-rotate-180': open,
                })}
              />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="ul"
              static
              className="z-[1500] absolute top-[40px] w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {navigationOption.map((item) =>
                (item.isDisplayed ? (
                  <Menu.Item as="li" key={item.name}>
                    {({ active }) => (
                      <button
                        type="button"
                        className={mergeClassName(
                          'w-full px-4 py-2 text-sm text-gray-700 text-left',
                          { 'bg-gray-100': active },
                        )}
                        onClick={item.onClick}
                      >
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                ) : null))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default NavigationMenu;
