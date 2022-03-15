/* eslint-disable no-console */
import * as Sentry from '@sentry/serverless';
import cls from 'cls-hooked';
import JSONBigInt from 'json-bigint';
import { ExceptionEvents } from '../types';
import sequelize from '../database';

Sentry.AWSLambda.init({
  dsn: process.env.SENTRY_DNS,

  tracesSampleRate: 1.0,
});

export const withSentry = (fn: any) => Sentry.AWSLambda.wrapHandler(fn);

export const transaction = (task) => (cls.getNamespace(process.env.NODE_ENV).get('transaction') ? task()
  : sequelize.transaction(task));

export const putSentryEvent = (
  event: ExceptionEvents,
  error: string,
  tags?: { [key: string]: string },
  extra?: { [key: string]: any },
) => {
  let message = `An unexpected error has occurred: ${error}`;
  const level = Sentry.Severity.Error;

  switch (event) {
    case 'API_REQUEST_FAILED': {
      message = `Error requesting data from server: ${error}`;
      break;
    }
    case 'DATABASE_READ_FAILED':
      message = `Error fetching data from database: ${error}`;
      break;
    case 'DATABASE_WRITE_FAILED':
      message = `Error while writing data to database: ${error}`;
      break;
    case 'S3_FETCH_FAILED': {
      message = `Error fetching data from Amazon S3 server: ${error}`;
      break;
    }
    case 'S3_PUT_FAILED': {
      message = `Error while uploading data to Amazon S3 bucket: ${error}`;
      break;
    }
    case 'EVENT_BRIDGE_TRIGGER_FAILED': {
      message = `Error while triggering an event on event bridge: ${error}`;
      break;
    }
    case 'UNEXPECTED_EXCEPTION':
    default:
      break;
  }

  console.log(message);
  Sentry.captureEvent({
    message,
    level,
    tags,
    extra,
  });
};

export const parseBigIntData = (data) => JSONBigInt({ storeAsString: true }).parse(data);
