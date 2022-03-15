import { addUser } from '../../../../src/modules/requests/database';
import { userRecord } from '../../../fixtures';
import { User } from '../../../../src/models/User';
import sequelize from '../../../../src/database';
import * as helpers from '../../../../src/modules/helpers';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

afterEach(() => {
  jest.clearAllMocks();
});

const mockPutSentryObject = jest.spyOn(helpers, 'putSentryEvent').mockImplementation(() => '');

describe('User', () => {
  it('should save on database correctly', async () => {
    await addUser(userRecord);

    const response = await User.findAll();

    expect(response).toMatchObject([
      { ...userRecord }]);
  });

  it('should trigger sentry event if an exception has raised', async () => {
    jest.spyOn(User, 'upsert').mockRejectedValueOnce(new Error('error getting from database'));
    await addUser(userRecord);

    expect(mockPutSentryObject).toHaveBeenCalledWith('DATABASE_WRITE_FAILED', new Error('error getting from database'), {
      method: 'upsert',
      table: 'User',
    }, userRecord);
  });
});
