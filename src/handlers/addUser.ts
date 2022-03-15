// eslint-disable-next-line import/no-extraneous-dependencies
import { APIGatewayEvent } from 'aws-lambda';
import { putSentryEvent, withSentry } from '../modules/helpers';
import { User } from '../types';
import * as requests from '../modules/requests/database/user';

export const addUser = async (event: APIGatewayEvent) => {
  try {
    const body = JSON.parse(event.body || '') as User;

    const user = await requests.addUser(body);
    return {
      statusCode: 201,
      body: JSON.stringify(user),
    };
  } catch (error) {
    putSentryEvent('UNEXPECTED_EXCEPTION', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An unexpected error occur' }),
    };
  }
};

export default withSentry(addUser);
