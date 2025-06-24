# Parse Server TypeScript Migration Tracker

This document tracks the progress of converting JavaScript files to TypeScript in the Parse Server codebase.

## Migration Status

- **Total Files to Convert**: 188 JavaScript files
- **Files Already Converted**: 4 TypeScript files
- **Progress**: 2% complete

## Conversion Priority Tiers

### TIER 1: CRITICAL CORE FILES (Convert First)

These are the foundation files that everything else depends on. Convert these first for maximum impact.

- [x] **`src/Config.js`** (1,234 lines)
  - **Why Critical**: Application configuration management, used by all components
  - **Complexity**: High - configuration validation, option management, caching
  - **Dependencies**: Used by all controllers and ParseServer initialization
  - **Impact**: Converting this will provide type safety for all configuration options

- [x] **`src/Utils.js`** (456 lines)
  - **Why Critical**: General purpose utilities, used throughout the codebase
  - **Complexity**: Medium - utility functions, validation helpers, data processing
  - **Dependencies**: Used by multiple controllers and utility functions
  - **Impact**: Converting this will provide type safety for common utility operations


- [ ] **`src/Controllers/DatabaseController.js`** (1,875 lines)
  - **Why Critical**: Core database operations, used by virtually every other component
  - **Complexity**: Very high - complex query validation, ACL handling, schema management
  - **Dependencies**: Used by all controllers and routers
  - **Impact**: Converting this will provide type safety for the entire data layer

- [ ] **`src/Controllers/SchemaController.js`** (1,668 lines)
  - **Why Critical**: Schema validation and management, fundamental to Parse Server
  - **Complexity**: Very high - schema validation, field type checking, permissions
  - **Dependencies**: Used by DatabaseController and all data operations
  - **Impact**: Critical for data integrity and type safety

- [ ] **`src/Controllers/index.js`** (239 lines)
  - **Why Critical**: Factory for all controllers, central dependency injection
  - **Complexity**: Medium - controller initialization and configuration
  - **Dependencies**: Imports all controllers, used by ParseServer
  - **Impact**: Converting this will enable better typing for all controllers

- [ ] **`src/middlewares.js`** (701 lines)
  - **Why Critical**: Express middleware stack, request/response handling
  - **Complexity**: High - authentication, validation, error handling
  - **Dependencies**: Used by all routers and request processing
  - **Impact**: Critical for request flow and security

### TIER 2: HIGH PRIORITY CORE COMPONENTS

Core infrastructure that supports the main functionality.

- [ ] **`src/request.js`** (175 lines)
  - **Why High**: HTTP request handling, used throughout the application
  - **Complexity**: Medium - request validation and processing
  - **Dependencies**: Used by HooksController and external integrations

- [ ] **`src/rest.js`** (234 lines)
  - **Why High**: REST API handling, core to Parse Server functionality
  - **Complexity**: Medium - REST request/response processing
  - **Dependencies**: Used by StatusHandler and external API calls

- [ ] **`src/triggers.js`** (1,068 lines)
  - **Why High**: Cloud code triggers and functions, core Parse feature
  - **Complexity**: High - function management, validation, execution
  - **Dependencies**: Used by FunctionsRouter and cloud code execution

- [ ] **`src/StatusHandler.js`** (343 lines)
  - **Why High**: Push and job status management
  - **Complexity**: Medium - status tracking and queue management
  - **Dependencies**: Used by PushController and job execution

### TIER 3: CONTROLLERS (Convert in Dependency Order)

Convert these in dependency order, starting with base classes.

- [ ] **`src/Controllers/AdaptableController.js`** (69 lines)
  - **Why Important**: Base class for all controllers
  - **Complexity**: Low - base adapter pattern implementation
  - **Dependencies**: Used by all other controllers

- [ ] **`src/Controllers/UserController.js`** (376 lines)
  - **Why Important**: User management, authentication core
  - **Complexity**: High - user operations, email verification, password handling
  - **Dependencies**: Used by UsersRouter and authentication flows

- [ ] **`src/Controllers/FilesController.js`** (113 lines)
  - **Why Important**: File upload and management
  - **Complexity**: Medium - file handling and validation
  - **Dependencies**: Used by FilesRouter

- [ ] **`src/Controllers/PushController.js`** (246 lines)
  - **Why Important**: Push notification system
  - **Complexity**: Medium - push queue management and delivery
  - **Dependencies**: Used by PushRouter

- [ ] **`src/Controllers/HooksController.js`** (256 lines)
  - **Why Important**: Webhook management
  - **Complexity**: Medium - webhook execution and validation
  - **Dependencies**: Used by HooksRouter

- [ ] **`src/Controllers/LoggerController.js`** (244 lines)
  - **Why Important**: Logging system
  - **Complexity**: Medium - log level management and formatting
  - **Dependencies**: Used throughout the application

- [ ] **`src/Controllers/LiveQueryController.js`** (85 lines)
  - **Why Important**: Real-time query system
  - **Complexity**: Medium - WebSocket management and subscriptions
  - **Dependencies**: Used by LiveQuery functionality

- [ ] **`src/Controllers/AnalyticsController.js`** (37 lines)
  - **Why Important**: Analytics tracking
  - **Complexity**: Low - analytics data collection
  - **Dependencies**: Used by AnalyticsRouter

- [ ] **`src/Controllers/CacheController.js`** (76 lines)
  - **Why Important**: Caching system
  - **Complexity**: Low - cache adapter management
  - **Dependencies**: Used throughout the application

- [ ] **`src/Controllers/ParseGraphQLController.js`** (362 lines)
  - **Why Important**: GraphQL support
  - **Complexity**: High - GraphQL schema and query handling
  - **Dependencies**: Used by GraphQLRouter

### TIER 4: ROUTERS (Convert by Feature Group)

Convert these after their corresponding controllers are done.

- [ ] **`src/Routers/FunctionsRouter.js`** (196 lines)
  - **Why Important**: Cloud functions routing
  - **Complexity**: Medium - function execution and validation
  - **Dependencies**: Uses triggers.js

- [ ] **`src/Routers/ClassesRouter.js`** (252 lines)
  - **Why Important**: Object CRUD operations
  - **Complexity**: High - query processing and validation
  - **Dependencies**: Uses DatabaseController

- [ ] **`src/Routers/UsersRouter.js`** (687 lines)
  - **Why Important**: User operations routing
  - **Complexity**: High - user management operations
  - **Dependencies**: Uses UserController

- [ ] **`src/Routers/FilesRouter.js`** (356 lines)
  - **Why Important**: File operations routing
  - **Complexity**: Medium - file upload/download handling
  - **Dependencies**: Uses FilesController

- [ ] **`src/Routers/PagesRouter.js`** (743 lines)
  - **Why Important**: Custom pages routing
  - **Complexity**: High - page rendering and customization
  - **Dependencies**: Uses various controllers

- [ ] **`src/Routers/PublicAPIRouter.js`** (333 lines)
  - **Why Important**: Public API endpoints
  - **Complexity**: Medium - public API handling
  - **Dependencies**: Uses various controllers

- [ ] **`src/Routers/PushRouter.js`** (84 lines)
  - **Why Important**: Push notification routing
  - **Complexity**: Medium - push notification handling
  - **Dependencies**: Uses PushController

- [ ] **`src/Routers/GraphQLRouter.js`** (39 lines)
  - **Why Important**: GraphQL routing
  - **Complexity**: Low - GraphQL endpoint handling
  - **Dependencies**: Uses ParseGraphQLController

- [ ] **`src/Routers/HooksRouter.js`** (146 lines)
  - **Why Important**: Webhook routing
  - **Complexity**: Medium - webhook endpoint handling
  - **Dependencies**: Uses HooksController

- [ ] **`src/Routers/GlobalConfigRouter.js`** (101 lines)
  - **Why Important**: Global configuration routing
  - **Complexity**: Medium - configuration management
  - **Dependencies**: Uses various controllers

- [ ] **`src/Routers/SchemasRouter.js`** (156 lines)
  - **Why Important**: Schema management routing
  - **Complexity**: Medium - schema operations
  - **Dependencies**: Uses SchemaController

- [ ] **`src/Routers/SessionsRouter.js`** (97 lines)
  - **Why Important**: Session management routing
  - **Complexity**: Medium - session operations
  - **Dependencies**: Uses UserController

- [ ] **`src/Routers/RolesRouter.js`** (28 lines)
  - **Why Important**: Role management routing
  - **Complexity**: Low - role operations
  - **Dependencies**: Uses UserController

- [ ] **`src/Routers/InstallationsRouter.js`** (50 lines)
  - **Why Important**: Installation management routing
  - **Complexity**: Low - installation operations
  - **Dependencies**: Uses various controllers

- [ ] **`src/Routers/LogsRouter.js`** (59 lines)
  - **Why Important**: Log management routing
  - **Complexity**: Low - log operations
  - **Dependencies**: Uses LoggerController

- [ ] **`src/Routers/AnalyticsRouter.js`** (20 lines)
  - **Why Important**: Analytics routing
  - **Complexity**: Low - analytics operations
  - **Dependencies**: Uses AnalyticsController

- [ ] **`src/Routers/AggregateRouter.js`** (135 lines)
  - **Why Important**: Aggregate operations routing
  - **Complexity**: Medium - aggregate query handling
  - **Dependencies**: Uses DatabaseController

- [ ] **`src/Routers/AudiencesRouter.js`** (76 lines)
  - **Why Important**: Audience management routing
  - **Complexity**: Medium - audience operations
  - **Dependencies**: Uses various controllers

- [ ] **`src/Routers/FeaturesRouter.js`** (63 lines)
  - **Why Important**: Feature flag routing
  - **Complexity**: Low - feature flag operations
  - **Dependencies**: Uses various controllers

- [ ] **`src/Routers/IAPValidationRouter.js`** (124 lines)
  - **Why Important**: In-app purchase validation routing
  - **Complexity**: Medium - IAP validation
  - **Dependencies**: Uses various controllers

- [ ] **`src/Routers/CloudCodeRouter.js`** (124 lines)
  - **Why Important**: Cloud code routing
  - **Complexity**: Medium - cloud code operations
  - **Dependencies**: Uses triggers.js

- [ ] **`src/Routers/SecurityRouter.js`** (34 lines)
  - **Why Important**: Security operations routing
  - **Complexity**: Low - security operations
  - **Dependencies**: Uses Security components

- [ ] **`src/Routers/PurgeRouter.js`** (40 lines)
  - **Why Important**: Data purge routing
  - **Complexity**: Low - purge operations
  - **Dependencies**: Uses DatabaseController

### TIER 5: UTILITIES AND SPECIALIZED COMPONENTS

- [ ] **`src/batch.js`** (152 lines)
  - **Why Medium**: Batch operations
  - **Complexity**: Medium - batch request processing
  - **Dependencies**: Used by batch endpoints

- [ ] **`src/cryptoUtils.js`** (48 lines)
  - **Why Medium**: Cryptographic utilities
  - **Complexity**: Low - hashing and encryption
  - **Dependencies**: Used by various components

- [ ] **`src/password.js`** (34 lines)
  - **Why Medium**: Password handling
  - **Complexity**: Low - password hashing and validation
  - **Dependencies**: Used by UserController

- [ ] **`src/AccountLockout.js`** (181 lines)
  - **Why Medium**: Account security
  - **Complexity**: Medium - lockout logic and validation
  - **Dependencies**: Used by UserController

- [ ] **`src/PromiseRouter.js`** (211 lines)
  - **Why Medium**: Promise-based routing
  - **Complexity**: Medium - promise handling for routes
  - **Dependencies**: Used by all routers

- [ ] **`src/ParseServerRESTController.js`** (165 lines)
  - **Why Medium**: REST controller for Parse Server
  - **Complexity**: Medium - REST API handling
  - **Dependencies**: Used by Parse Server

- [ ] **`src/ParseMessageQueue.js`** (23 lines)
  - **Why Medium**: Message queue handling
  - **Complexity**: Low - message queue operations
  - **Dependencies**: Used by various components

- [ ] **`src/KeyPromiseQueue.js`** (44 lines)
  - **Why Medium**: Promise queue with keys
  - **Complexity**: Low - promise queue management
  - **Dependencies**: Used by StatusHandler

- [ ] **`src/Page.js`** (37 lines)
  - **Why Medium**: Page handling
  - **Complexity**: Low - page operations
  - **Dependencies**: Used by PagesRouter

- [ ] **`src/cache.js`** (5 lines)
  - **Why Medium**: Cache utilities
  - **Complexity**: Low - cache operations
  - **Dependencies**: Used by various components

- [ ] **`src/defaults.js`** (36 lines)
  - **Why Medium**: Default configurations
  - **Complexity**: Low - default value management
  - **Dependencies**: Used by ParseServer

- [ ] **`src/deprecated.js`** (6 lines)
  - **Why Medium**: Deprecation utilities
  - **Complexity**: Low - deprecation handling
  - **Dependencies**: Used by various components

- [ ] **`src/requiredParameter.js`** (5 lines)
  - **Why Medium**: Parameter validation
  - **Complexity**: Low - parameter checking
  - **Dependencies**: Used by various components

- [ ] **`src/ClientSDK.js`** (41 lines)
  - **Why Medium**: Client SDK utilities
  - **Complexity**: Low - SDK operations
  - **Dependencies**: Used by various components

- [ ] **`src/Auth.js`** (618 lines)
  - **Why Medium**: Authentication system
  - **Complexity**: High - authentication logic
  - **Dependencies**: Used by various components

### TIER 6: ADAPTERS AND SPECIALIZED SYSTEMS

These are more isolated and can be converted later.

- [ ] **`src/Adapters/Storage/Mongo/MongoStorageAdapter.js`** (Large)
  - **Why Lower**: MongoDB-specific storage
  - **Complexity**: High - MongoDB operations
  - **Dependencies**: Used by DatabaseController

- [ ] **`src/Adapters/Storage/Postgres/PostgresStorageAdapter.js`** (Large)
  - **Why Lower**: PostgreSQL-specific storage
  - **Complexity**: High - PostgreSQL operations
  - **Dependencies**: Used by DatabaseController

- [ ] **`src/Adapters/Storage/Mongo/MongoTransform.js`** (Large)
  - **Why Lower**: MongoDB data transformation
  - **Complexity**: High - data transformation logic
  - **Dependencies**: Used by MongoStorageAdapter

- [ ] **`src/Adapters/Storage/Mongo/MongoCollection.js`** (Large)
  - **Why Lower**: MongoDB collection handling
  - **Complexity**: High - collection operations
  - **Dependencies**: Used by MongoStorageAdapter

- [ ] **`src/Adapters/Storage/Mongo/MongoSchemaCollection.js`** (Large)
  - **Why Lower**: MongoDB schema collection
  - **Complexity**: High - schema collection operations
  - **Dependencies**: Used by MongoStorageAdapter

- [ ] **`src/Adapters/Storage/Postgres/PostgresClient.js`** (Large)
  - **Why Lower**: PostgreSQL client handling
  - **Complexity**: High - PostgreSQL client operations
  - **Dependencies**: Used by PostgresStorageAdapter

- [ ] **`src/Adapters/Storage/Postgres/PostgresConfigParser.js`** (Large)
  - **Why Lower**: PostgreSQL configuration parsing
  - **Complexity**: Medium - configuration parsing
  - **Dependencies**: Used by PostgresStorageAdapter

- [ ] **`src/Adapters/Storage/StorageAdapter.js`** (Large)
  - **Why Lower**: Base storage adapter
  - **Complexity**: High - adapter interface
  - **Dependencies**: Used by all storage adapters

- [ ] **`src/Adapters/Cache/` directory** (Multiple files)
  - **Why Lower**: Cache adapters
  - **Complexity**: Medium - cache implementations
  - **Dependencies**: Used by CacheController

- [ ] **`src/Adapters/Auth/` directory** (Multiple files)
  - **Why Lower**: Authentication adapters
  - **Complexity**: Medium - auth implementations
  - **Dependencies**: Used by Auth system

- [ ] **`src/Adapters/Files/` directory** (Multiple files)
  - **Why Lower**: File storage adapters
  - **Complexity**: Medium - file implementations
  - **Dependencies**: Used by FilesController

- [ ] **`src/Adapters/Logger/` directory** (Multiple files)
  - **Why Lower**: Logging adapters
  - **Complexity**: Low - logging implementations
  - **Dependencies**: Used by LoggerController

- [ ] **`src/Adapters/Analytics/` directory** (Multiple files)
  - **Why Lower**: Analytics adapters
  - **Complexity**: Low - analytics implementations
  - **Dependencies**: Used by AnalyticsController

- [ ] **`src/Adapters/PubSub/` directory** (Multiple files)
  - **Why Lower**: Pub/Sub adapters
  - **Complexity**: Medium - pub/sub implementations
  - **Dependencies**: Used by LiveQuery

- [ ] **`src/Adapters/Push/` directory** (Multiple files)
  - **Why Lower**: Push notification adapters
  - **Complexity**: Medium - push implementations
  - **Dependencies**: Used by PushController

- [ ] **`src/Adapters/MessageQueue/` directory** (Multiple files)
  - **Why Lower**: Message queue adapters
  - **Complexity**: Medium - message queue implementations
  - **Dependencies**: Used by various components

- [ ] **`src/Adapters/WebSocketServer/` directory** (Multiple files)
  - **Why Lower**: WebSocket server adapters
  - **Complexity**: Medium - WebSocket implementations
  - **Dependencies**: Used by LiveQuery

- [ ] **`src/Adapters/AdapterLoader.js`** (Large)
  - **Why Lower**: Adapter loading system
  - **Complexity**: Medium - adapter loading logic
  - **Dependencies**: Used by various adapters

- [ ] **`src/LiveQuery/` directory** (Multiple files)
  - **Why Lower**: Real-time query system
  - **Complexity**: High - WebSocket and subscription management
  - **Dependencies**: Used by LiveQueryController

- [ ] **`src/GraphQL/` directory** (Multiple files)
  - **Why Lower**: GraphQL implementation
  - **Complexity**: High - GraphQL schema and resolvers
  - **Dependencies**: Used by ParseGraphQLController

- [ ] **`src/Security/` directory** (Multiple files)
  - **Why Lower**: Security system
  - **Complexity**: Medium - security implementations
  - **Dependencies**: Used by SecurityRouter

- [ ] **`src/SchemaMigrations/` directory** (Multiple files)
  - **Why Lower**: Schema migration system
  - **Complexity**: Medium - migration implementations
  - **Dependencies**: Used by SchemaController

- [ ] **`src/Push/` directory** (Multiple files)
  - **Why Lower**: Push notification system
  - **Complexity**: Medium - push implementations
  - **Dependencies**: Used by PushController

- [ ] **`src/Deprecator/` directory** (Multiple files)
  - **Why Lower**: Deprecation system
  - **Complexity**: Low - deprecation handling
  - **Dependencies**: Used by various components

- [ ] **`src/Options/` directory** (Multiple files)
  - **Why Lower**: Options management
  - **Complexity**: Low - options handling
  - **Dependencies**: Used by ParseServer

- [ ] **`src/cloud-code/` directory** (Multiple files)
  - **Why Lower**: Cloud code system
  - **Complexity**: Medium - cloud code implementations
  - **Dependencies**: Used by triggers.js

### TIER 7: CLI AND REMAINING UTILITIES

These have the least impact on the core system.

- [ ] **`src/cli/` directory** (Multiple files)
  - **Why Lowest**: Command-line interface
  - **Complexity**: Medium - CLI argument parsing and execution
  - **Dependencies**: Standalone functionality

- [ ] **`src/vendor/` directory** (Multiple files)
  - **Why Lowest**: Vendor utilities
  - **Complexity**: Low - vendor implementations
  - **Dependencies**: Used by various components

## Files Already Converted ✅

- [x] **`src/index.ts`** (48 lines)
- [x] **`src/logger.ts`** (37 lines)
- [x] **`src/ParseServer.ts`** (654 lines)
- [x] **`src/Config.ts`** (772 lines) - Previously Config.js
- [x] **`src/Utils.ts`** (416 lines) - Previously Utils.js

## Migration Notes

### TypeScript Configuration Updates Needed

1. **Enable gradual migration**:
   ```json
   {
     "compilerOptions": {
       "allowJs": true,
       "noImplicitAny": true,
       "strict": true,
       "skipLibCheck": false
     }
   }
   ```

2. **Update build process** to handle mixed JS/TS files

3. **Add type definitions** for external dependencies

### Conversion Process

1. **Rename file**: `.js` → `.ts`
2. **Add type annotations** gradually
3. **Fix type errors** incrementally
4. **Add JSDoc comments** for complex functions
5. **Create interfaces** for function parameters and return types

### Testing Strategy

- Maintain existing test coverage
- Add type checking to CI pipeline
- Use `npm run test:types` for type validation
- Gradually enable stricter TypeScript settings

## Progress Tracking

- **Tier 1**: 0/4 files converted
- **Tier 2**: 0/4 files converted
- **Tier 3**: 0/10 files converted
- **Tier 4**: 0/20 files converted
- **Tier 5**: 0/15 files converted
- **Tier 6**: 0/50+ files converted
- **Tier 7**: 0/10+ files converted

**Overall Progress**: 5/188 files converted (2.7%)

---

*Last updated: [Date]*
*Total files to convert: 188*
*Files converted: 5* 