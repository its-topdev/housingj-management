import * as apartmentSetup from './apartmentSetup';
import * as ledger from './ledger';
import * as bedManagement from './bedManagement';
import { Housing } from '../pages';

export const housingPages = [
  apartmentSetup,
  ledger,
  bedManagement,
];

export const housingRoutes = (protectedRoute, layout) => {
  const housingRoutes = (routes) => routes(protectedRoute, <Housing />);

  return {
    path: '/housing',
    element: layout,
    children: housingPages.map(({ routes }) => housingRoutes(routes)),
  };
};
