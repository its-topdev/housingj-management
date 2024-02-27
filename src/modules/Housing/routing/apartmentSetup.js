import {
  ApartmentSetup,
} from '@/modules/Housing';

import { abilityConstants } from '@/lib';

const { ACCESS_HOUSING_ABILITY } = abilityConstants;

export const PATH = '/housing/apartment-setup';

export const NAME = 'Apartment Setup';

export const routes = (protectedRoute, layout) => ({
  path: PATH,
  element: layout,
  children: [
    {
      index: true,
      element: protectedRoute(
        <ApartmentSetup />,
        ACCESS_HOUSING_ABILITY,
      ),
    },
  ],
});
