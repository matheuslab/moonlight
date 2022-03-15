import { User, UserRecord } from '../../src/types';
import { dateMock } from './common';

export const user: User = {
  cpf: '123.456.789-09',
  name: 'Matheus',
  phoneNumber: '89 9 9988-7788',
};

export const userRecord: UserRecord = {
  ...user,
  id: '489afc18-e409-40e2-b1b3-07b17b490711',
  createdAt: new Date(dateMock),
  updatedAt: new Date(dateMock),
};
