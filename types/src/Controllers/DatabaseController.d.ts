import SchemaController from './SchemaController';
import { StorageAdapter } from '../Adapters/Storage/StorageAdapter';
import type { LoadSchemaOptions } from './types';
import type { ParseServerOptions } from '../Options';
import type { QueryOptions, FullQueryOptions } from '../Adapters/Storage/StorageAdapter';
declare const validateQuery: (query: any, isMaster: boolean, isMaintenance: boolean, update: boolean) => void;
declare const filterSensitiveData: (isMaster: boolean, isMaintenance: boolean, aclGroup: string[], auth: {
    user?: {
        id: string;
    };
}, operation: string, schema: SchemaController | any, className: string, protectedFields: string[] | null, object: {
    [key: string]: any;
    objectId?: string;
    password?: string;
    _hashed_password?: string;
    sessionToken?: string;
    authData?: any;
}, _query: any) => {
    [key: string]: any;
};
interface RelationUpdate {
    key: string;
    op: {
        __op: string;
        objects?: Array<{
            objectId: string;
        }>;
        ops?: any[];
    };
}
declare class DatabaseController {
    adapter: StorageAdapter;
    schemaCache: any;
    schemaPromise?: Promise<SchemaController>;
    _transactionalSession?: any;
    options: ParseServerOptions;
    idempotencyOptions: any;
    constructor(adapter: StorageAdapter, options: ParseServerOptions);
    collectionExists(className: string): Promise<boolean>;
    purgeCollection(className: string): Promise<void>;
    validateClassName(className: string): Promise<void>;
    loadSchema(options?: LoadSchemaOptions): Promise<SchemaController>;
    loadSchemaIfNeeded(schemaController: SchemaController, options?: LoadSchemaOptions): Promise<SchemaController>;
    redirectClassNameForKey(className: string, key: string): Promise<string | undefined>;
    validateObject(className: string, object: any, query: any, runOptions: QueryOptions, maintenance: boolean): Promise<any>;
    update(className: string, query: any, update: any, { acl, many, upsert, addsField }: FullQueryOptions, skipSanitization: boolean, validateOnly: boolean, validSchemaController: SchemaController): Promise<any>;
    collectRelationUpdates(className: string, objectId: string | undefined, update: {
        [key: string]: any;
        objectId?: string;
    }): RelationUpdate[];
    handleRelationUpdates(className: string, objectId: string, update: {
        [key: string]: any;
        objectId?: string;
    }, ops: RelationUpdate[]): Promise<void>;
    addRelation(key: string, fromClassName: string, fromId: string, toId: string): Promise<any>;
    removeRelation(key: string, fromClassName: string, fromId: string, toId: string): Promise<void>;
    destroy(className: string, query: any, { acl }: QueryOptions, validSchemaController: SchemaController): Promise<any>;
    create(className: string, object: any, { acl }: QueryOptions, validateOnly: boolean, validSchemaController: SchemaController): Promise<any>;
    canAddField(schema: SchemaController, className: string, object: any, aclGroup: string[], runOptions: QueryOptions): Promise<boolean> | Promise<void>;
    /**
     * Delete all classes and clears the schema cache
     *
     * @param {boolean} fast set to true if it's ok to just delete rows and not indexes
     * @returns {Promise<void>} when the deletions completes
     */
    deleteEverything(fast?: boolean): Promise<any>;
    relatedIds(className: string, key: string, owningId: string, queryOptions: QueryOptions): Promise<Array<string>>;
    owningIds(className: string, key: string, relatedIds: string[]): Promise<string[]>;
    reduceInRelation(className: string, query: any, schema: any): Promise<any>;
    reduceRelationKeys(className: string, query: any, queryOptions: any): Promise<void> | void;
    addInObjectIdsIds(ids: string[] | null, query: any): any;
    addNotInObjectIdsIds(ids: string[], query: any): any;
    find(className: string, query: any, { skip, limit, acl, sort, count, keys, op, distinct, pipeline, readPreference, hint, caseInsensitive, explain, comment, }: any, auth: any, validSchemaController: SchemaController): Promise<any>;
    deleteSchema(className: string): Promise<void>;
    objectToEntriesStrings(query: {
        [key: string]: any;
    }): string[];
    reduceOrOperation(query: {
        $or: any[];
    }): {
        [key: string]: any;
    };
    reduceAndOperation(query: {
        $and: any[];
    }): {
        [key: string]: any;
    };
    addPointerPermissions(schema: SchemaController, className: string, operation: string, query: any, aclGroup?: any[]): any;
    addProtectedFields(schema: SchemaController | any, className: string, query?: any, aclGroup?: any[], auth?: any, queryOptions?: FullQueryOptions): null | string[];
    createTransactionalSession(): any;
    commitTransactionalSession(): any;
    abortTransactionalSession(): any;
    performInitialization(): Promise<void>;
    _expandResultOnKeyPath(object: any, key: string, value: any): any;
    _sanitizeDatabaseResult(originalObject: any, result: any): Promise<any>;
    static _validateQuery: typeof validateQuery;
    static filterSensitiveData: typeof filterSensitiveData;
}
export default DatabaseController;
