import ParseServer from './ParseServer';
import FileSystemAdapter from '@parse/fs-files-adapter';
import InMemoryCacheAdapter from './Adapters/Cache/InMemoryCacheAdapter.js';
import NullCacheAdapter from './Adapters/Cache/NullCacheAdapter.js';
import RedisCacheAdapter from './Adapters/Cache/RedisCacheAdapter.js';
import LRUCacheAdapter from './Adapters/Cache/LRUCache.js';
import * as TestUtils from './TestUtils.js';
import * as SchemaMigrations from './SchemaMigrations/Migrations.js';
import AuthAdapter from './Adapters/Auth/AuthAdapter.js';
import { useExternal } from './deprecated.js';
import { getLogger } from './logger.js';
import { PushWorker } from './Push/PushWorker.js';
import { ParseServerOptions } from './Options/index.js';
import { ParseGraphQLServer } from './GraphQL/ParseGraphQLServer.js';

// Factory function
const _ParseServer = function (options: ParseServerOptions) {
  const server = new ParseServer(options);
  return server;
};
// Mount the create liveQueryServer
_ParseServer.createLiveQueryServer = ParseServer.createLiveQueryServer;
_ParseServer.startApp = ParseServer.startApp;

const S3Adapter = useExternal('S3Adapter', '@parse/s3-files-adapter');
const GCSAdapter = useExternal('GCSAdapter', '@parse/gcs-files-adapter');

Object.defineProperty(module.exports, 'logger', {
  get: getLogger,
});

export default ParseServer;
export {
  S3Adapter,
  GCSAdapter,
  FileSystemAdapter,
  InMemoryCacheAdapter,
  NullCacheAdapter,
  RedisCacheAdapter,
  LRUCacheAdapter,
  TestUtils,
  PushWorker,
  ParseGraphQLServer,
  _ParseServer as ParseServer,
  SchemaMigrations,
  AuthAdapter,
};
