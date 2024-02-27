import * as apartmentApis from './apartment/api';
import * as apartmentMappers from './apartment/mappers';
import * as areaApis from './area/api';
import * as areaMappers from './area/mappers';
import * as partnershipApis from './partnership/api';
import * as partnershipMappers from './partnership/mappers';
import * as ledgerApis from './ledger/api';
import * as ledgerMappers from './ledger/mappers';

const combinedApis = {
  ...apartmentApis,
  ...areaApis,
  ...partnershipApis,
  ...ledgerApis,
};

export const Mapper = {
  ...apartmentMappers,
  ...areaMappers,
  ...partnershipMappers,
  ...ledgerMappers,
};

export default combinedApis;
