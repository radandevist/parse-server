import _ from 'lodash';
import { default as convict } from 'convict';
import requiredParameter from '../requiredParameter';

export type ParseServerOptions = {
  appId: string;
  masterKey: string | (() => void);
  serverURL: string;
  javascriptKey?: string;
}

export const ready_keys = [
  'appId',
  'masterKey',
  'serverURL',
  'javascriptKey',
]

export const ParseServerOptionsSchema = convict<ParseServerOptions>({
  appId: {
    doc: 'Your Parse Application ID',
    format: (val: unknown) => {
      if (_.isNil(val)) {
        return requiredParameter('You must provide an appId!');
      }
      if (!_.isString(val)) {
        throw new TypeError('appId must be a string');
      }
      if (val === '') {
        throw new Error('appId cannot be empty');
      }
    },
    default: null,
    env: 'PARSE_SERVER_APPLICATION_ID',
    
  },
  masterKey: {
    doc: 'Your Parse Master Key',
    format: (val: unknown) => {
      if (_.isNil(val)) {
        return requiredParameter('You must provide a masterKey!');
      }
      if (!_.isFunction(val) && !_.isString(val)) {
        throw new TypeError('masterKey must be a string or a function');
      }
      if (val === '') {
        throw new Error('masterKey cannot be empty');
      } 
    },
    default: null,
    env: 'PARSE_SERVER_MASTER_KEY',
  },
  serverURL: {
    doc: 'URL to your parse server with http:// or https://.',
    format: (val: unknown) => {
      if (_.isNil(val)) {
        return requiredParameter('You must provide an serverURL!');
      }
      if (!_.isString(val)) {
        throw new TypeError('appId must be a string');
      }
      if (val === '') {
        throw new Error('appId cannot be empty');
      } 
    },
    default: null,
    env: 'PARSE_SERVER_URL',
    
  },
  javascriptKey: {
    doc: 'Key for the Javascript SDK',
    format: (val: unknown) => {
      if (!_.isNil(val) && !_.isString(val)) {
        throw new TypeError('javascriptKey must be a string');
      }
      if (val === '') {
        throw new Error('javascriptKey cannot be empty');
      }
    },
    default: null,
  },
});

// type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
// type Prettify<T> = {
//   [K in keyof T]: T[K];
// } & {};

// const _options = ParseServerOptionsSchema.getProperties();
// export type ParseServerOptions = Prettify<MakeOptional<typeof _options, 'javascriptKey'>>;

// export interface ParseServerOptions extends _Options {}
