export type LoadSchemaOptions = {
  clearCache: boolean,
};

export type SchemaField = {
  type: string,
  targetClass?: string,
  required?: boolean,
  defaultValue?: any,
};

export type SchemaFields = { [key: string]: SchemaField };

export type Schema = {
  className: string,
  fields: SchemaFields,
  classLevelPermissions: ClassLevelPermissions,
  indexes?: any,
};

export type ClassLevelPermissions = {
  find?: { [key: string]: boolean },
  count?: { [key: string]: boolean },
  get?: { [key: string]: boolean },
  create?: { [key: string]: boolean },
  update?: { [key: string]: boolean },
  delete?: { [key: string]: boolean },
  addField?: { [key: string]: boolean },
  readUserFields?: string[],
  writeUserFields?: string[],
  protectedFields?: { [key: string]: string[] },
};
