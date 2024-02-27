import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { abilityConstants, userCan } from '@/lib';
import { splitPathBySlashes } from '@/lib/utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import NavigationMenu from './NavigationMenu';

const {
  ACCESS_HOUSING_ABILITY,
} = abilityConstants;

const TopNav = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrentLocation = (path) => {
    const splittedMenuPath = splitPathBySlashes(path);
    const splittedPathname = splitPathBySlashes(location.pathname);

    return path === location.pathname;
  };

  const navigationOption = [
    {
      isDisplayed: true,
      name: 'Onboarding',
      onClick: () => {
        navigate('/onboarding');
      },
    },
    {
      isDisplayed: true,
      name: 'Sales planning tool',
      onClick: () => {
        navigate('/sales-planning');
      },
    },
    {
      isDisplayed: true,
      name: 'Admin Tools',
      onClick: () => {
        navigate('/plan-builder');
      },
    },
    {
      isDisplayed: true,
      name: 'Housing',
      onClick: () => {
        navigate('/housing/apartment-setup');
      },
    },
  ];

  const menuItems = [
    {
      name: 'Apartment Setup',
      path: '/housing/apartment-setup',
      ability: ACCESS_HOUSING_ABILITY,
    },
    {
      name: 'Ledger',
      path: '/housing/ledger',
      ability: ACCESS_HOUSING_ABILITY,
    },
    {
      name: 'Ledger Archive',
      path: '/housing/ledger/archived',
      ability: ACCESS_HOUSING_ABILITY,
    },
    {
      name: 'Bed management',
      path: '/housing/bed-management',
      ability: ACCESS_HOUSING_ABILITY,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-white border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-10">
          <div className="flex">
            <div className="hidden sm:flex sm:space-x-8">
              <NavigationMenu name="Housing" navigationOption={navigationOption} />
              {menuItems.map((item) =>
                (userCan(user, item.ability) ? (
                  <Link
                    to={item.path}
                    key={item.name}
                    className={classNames(
                      (
                        item.isCurrentLocation
                          ? item.isCurrentLocation()
                          : isCurrentLocation(item.path)
                      )
                        ? 'border-gray-900 text-gray-900 border-b-4'
                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-700 border-b-2',
                      'inline-flex items-center px-1 pt-1 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ) : null))}
            </div>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.path}
              className={classNames(
                isCurrentLocation(item.path)
                  ? 'border-gray-900 text-gray-900 border-b-4'
                  : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-700 border-b-2',
                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};

TopNav.propTypes = {
  user: PropTypes.object,
};

export default TopNav;
