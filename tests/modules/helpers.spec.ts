/* eslint-disable no-console */
import * as Sentry from '@sentry/serverless';
import { parseBigIntData, putSentryEvent, withSentry } from '../../src/modules/helpers';

const mockSentryCaptureEvents = jest.spyOn(Sentry, 'captureEvent').mockImplementation(() => '');
const mockSentryWrapHandler = jest.spyOn(Sentry.AWSLambda, 'wrapHandler').mockImplementation(jest.fn());

beforeEach(() => jest.clearAllMocks());

console.log = jest.fn();

process.env = {
  SERVICE: 'moonlight',
  STAGE: 'test',
};

describe('putSentryEvent', () => {
  it.each([{
    event: 'DATABASE_WRITE_FAILED' as const,
    error: 'database write error',
    tags: { table: 'test' },
    level: Sentry.Severity.Error,
    message: 'Error while writing data to database: database write error',
    extra: { ok: true },
  },
  {
    event: 'DATABASE_READ_FAILED' as const,
    error: 'database read error',
    tags: { table: 'test' },
    level: Sentry.Severity.Error,
    message: 'Error fetching data from database: database read error',
    extra: { ok: true },
  },
  {
    event: 'API_REQUEST_FAILED' as const,
    error: 'api request error',
    tags: { uri: 'test.moonlight.co' },
    level: Sentry.Severity.Error,
    message: 'Error requesting data from server: api request error',
    extra: { ok: true },
  },
  {
    event: 'S3_FETCH_FAILED' as const,
    error: 's3 fetch error',
    tags: { bucket: 'moonlight-bucket' },
    level: Sentry.Severity.Error,
    message: 'Error fetching data from Amazon S3 server: s3 fetch error',
    extra: { ok: true },
  },
  {
    event: 'S3_PUT_FAILED' as const,
    error: 's3 update error',
    tags: { bucket: 'moonlight-bucket' },
    level: Sentry.Severity.Error,
    message: 'Error while uploading data to Amazon S3 bucket: s3 update error',
    extra: { ok: true },
  },
  {
    event: 'UNEXPECTED_EXCEPTION' as const,
    error: 'unexpected error',
    tags: null,
    level: Sentry.Severity.Error,
    message: 'An unexpected error has occurred: unexpected error',
    extra: { ok: true },
  },
  {
    event: 'EVENT_BRIDGE_TRIGGER_FAILED' as const,
    error: 'unexpected error',
    tags: null,
    level: Sentry.Severity.Error,
    message: 'Error while triggering an event on event bridge: unexpected error',
    extra: { ok: true },
  },
  {
    event: undefined,
    error: 'unexpected error',
    tags: null,
    level: Sentry.Severity.Error,
    message: 'An unexpected error has occurred: unexpected error',
    extra: { ok: true },
  }])('should handle with $event event', ({
    event, error, tags, level, message, extra,
  }) => {
    putSentryEvent(event, error, tags, extra);

    expect(mockSentryCaptureEvents).toHaveBeenCalledWith({
      level,
      message,
      tags,
      extra,
    });

    expect(console.log).toHaveBeenCalledWith(message);
  });
});

describe('withSentry', () => {
  it('withSentry should call sentry wrap fn with correct props', () => {
    const fn = jest.fn();
    withSentry(fn);

    expect(mockSentryWrapHandler).toHaveBeenCalledWith(fn);
  });
});

describe('parseBigIntData', () => {
  it('should return properly', () => {
    const data = '{ "id": 202201000024377993 }';

    expect(parseBigIntData(data)).toEqual({ id: '202201000024377993' });
  });
});
