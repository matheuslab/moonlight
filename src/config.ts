/* eslint-disable import/no-extraneous-dependencies */
import * as AWS from 'aws-sdk';

export const s3 = new AWS.S3();
export const eventBridge = new AWS.EventBridge();
