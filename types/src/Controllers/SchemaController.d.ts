import { StorageAdapter } from '../Adapters/Storage/StorageAdapter';
import DatabaseController from './DatabaseController';
import type { Schema, SchemaFields, ClassLevelPermissions, SchemaField, LoadSchemaOptions } from './types';
declare const defaultColumns: {
    [key: string]: SchemaFields;
};
declare const requiredColumns: Readonly<{
    read: {
        _User: string[];
    };
    write: {
        _Product: string[];
        _Role: string[];
    };
}>;
declare const systemClasses: readonly string[];
declare function classNameIsValid(className: string): boolean;
declare function fieldNameIsValid(fieldName: string, className: string): boolean;
declare function invalidClassNameMessage(className: string): string;
declare const convertSchemaToAdapterSchema: (schema: any) => any;
declare const VolatileClassesSchemas: any[];
export default class SchemaController {
    _dbAdapter: StorageAdapter;
    schemaData: {
        [key: string]: Schema;
    };
    reloadDataPromise: Promise<any> | null;
    protectedFields: any;
    userIdRegEx: RegExp;
    constructor(databaseAdapter: StorageAdapter);
    reloadDataIfNeeded(): Promise<void>;
    reloadData(options?: LoadSchemaOptions): Promise<any>;
    getAllClasses(options?: LoadSchemaOptions): Promise<Array<Schema>>;
    setAllClasses(): Promise<Array<Schema>>;
    getOneSchema(className: string, allowVolatileClasses?: boolean, options?: LoadSchemaOptions): Promise<Schema>;
    addClassIfNotExists(className: string, fields?: SchemaFields, classLevelPermissions?: any, indexes?: any): Promise<void | Schema>;
    updateClass(className: string, submittedFields: SchemaFields, classLevelPermissions: any, indexes: any, database: DatabaseController): Promise<any>;
    enforceClassExists(className: string): Promise<SchemaController>;
    validateNewClass(className: string, fields: SchemaFields, classLevelPermissions: any): any;
    validateSchemaData(className: string, fields: SchemaFields, classLevelPermissions: ClassLevelPermissions, existingFieldNames: Array<string>): {
        code: any;
        error: any;
    };
    setPermissions(className: string, perms: any, newSchema: SchemaFields): Promise<void>;
    enforceFieldExists(className: string, fieldName: string, type: string | SchemaField, isValidation?: boolean, maintenance?: boolean): any;
    ensureFields(fields: any): void;
    deleteField(fieldName: string, className: string, database: DatabaseController): Promise<void>;
    deleteFields(fieldNames: Array<string>, className: string, database: DatabaseController): Promise<void>;
    validateObject(className: string, object: any, query: any, maintenance: boolean): Promise<any>;
    validateRequiredColumns(className: string, object: any, query: any): Promise<Awaited<this>>;
    testPermissionsForClassName(className: string, aclGroup: string[], operation: string): boolean;
    static testPermissions(classPermissions: any | null, aclGroup: string[], operation: string): boolean;
    static validatePermission(classPermissions: any | null, className: string, aclGroup: string[], operation: string, action?: string): Promise<boolean> | Promise<void>;
    validatePermission(className: string, aclGroup: string[], operation: string, action?: string): Promise<boolean> | Promise<void>;
    getClassLevelPermissions(className: string): any;
    getExpectedType(className: string, fieldName: string): SchemaField | string | undefined;
    hasClass(className: string): Promise<boolean>;
}
declare const load: (dbAdapter: StorageAdapter, options: any) => Promise<SchemaController>;
declare function buildMergedSchemaObject(existingFields: SchemaFields, putRequest: any): SchemaFields;
export { load, classNameIsValid, fieldNameIsValid, invalidClassNameMessage, buildMergedSchemaObject, systemClasses, defaultColumns, convertSchemaToAdapterSchema, VolatileClassesSchemas, SchemaController, requiredColumns, };
