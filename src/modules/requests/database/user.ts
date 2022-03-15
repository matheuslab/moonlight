import { User as UserModel } from '../../../models/User';
import { putSentryEvent, transaction } from '../../helpers';
import { User } from '../../../types';

export const addUser = async (user: User) => {
  try {
    return await transaction(async () => UserModel.upsert(user));
  } catch (error) {
    putSentryEvent('DATABASE_WRITE_FAILED', error, {
      method: 'upsert',
      table: 'User',
    }, user);
    return null;
  }
};
