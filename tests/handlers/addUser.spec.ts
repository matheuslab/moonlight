import createEvent from '@serverless/event-mocks';
import { addUser } from '../../src/handlers/addUser';
import * as helpers from '../../src/modules/helpers';
import { user, userRecord } from '../fixtures';
import * as requests from '../../src/modules/requests/database/user';

const mockedPutSentryEvent = jest.spyOn(helpers, 'putSentryEvent').mockImplementation(() => {});
jest.spyOn(requests, 'addUser').mockImplementation(() => Promise.resolve(userRecord));

describe('addUser', () => {
  const event = {
    body: JSON.stringify(user),
  } as any;

  it('should return correctly', async () => {
    const { body, statusCode } = await addUser(createEvent('aws:apiGateway', event));
    expect(body).toBe(JSON.stringify(userRecord));
    expect(statusCode).toBe(201);
  });

  it('should handle with unexpected errors', async () => {
    jest.spyOn(requests, 'addUser').mockRejectedValueOnce(new Error('Error while writing data to database'));
    const { body, statusCode } = await addUser(createEvent('aws:apiGateway', event));

    expect(body).toBe(JSON.stringify({ message: 'An unexpected error occur' }));
    expect(statusCode).toBe(500);
    expect(mockedPutSentryEvent).toHaveBeenCalledWith('UNEXPECTED_EXCEPTION', new Error('Error while writing data to database'));
  });
});
