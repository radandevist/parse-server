/**
 * utils.js
 * @file General purpose utilities
 * @description General purpose utilities.
 */
/**
 * Interface for localized path result
 */
interface LocalizedPathResult {
    path: string;
    subdir?: string;
}
/**
 * Interface for relative time result
 */
interface RelativeTimeResult {
    status: 'success' | 'error';
    info: string;
    result?: Date;
}
/**
 * Interface for parameter validation type definition
 */
interface ParameterType {
    t: string;
    v: (param: any) => boolean;
    o?: boolean;
}
/**
 * Interface for parameter validation types object
 */
interface ParameterTypes {
    [key: string]: ParameterType;
}
/**
 * Interface for keyword denylist item
 */
interface KeywordDenylistItem {
    key: string;
    value: any;
}
/**
 * Interface for config with keyword denylist
 */
interface ConfigWithKeywordDenylist {
    requestKeywordDenylist?: KeywordDenylistItem[];
}
/**
 * The general purpose utilities.
 */
declare class Utils {
    /**
     * @function getLocalizedPath
     * @description Returns a localized file path accoring to the locale.
     *
     * Localized files are searched in subfolders of a given path, e.g.
     *
     * root/
     * ├── base/                    // base path to files
     * │   ├── example.html         // default file
     * │   └── de/                  // de language folder
     * │   │   └── example.html     // de localized file
     * │   └── de-AT/               // de-AT locale folder
     * │   │   └── example.html     // de-AT localized file
     *
     * Files are matched with the locale in the following order:
     * 1. Locale match, e.g. locale `de-AT` matches file in folder `de-AT`.
     * 2. Language match, e.g. locale `de-AT` matches file in folder `de`.
     * 3. Default; file in base folder is returned.
     *
     * @param {String} defaultPath The absolute file path, which is also
     * the default path returned if localization is not available.
     * @param {String} locale The locale.
     * @returns {Promise<Object>} The object contains:
     * - `path`: The path to the localized file, or the original path if
     *   localization is not available.
     * - `subdir`: The subdirectory of the localized file, or undefined if
     *   there is no matching localized file.
     */
    static getLocalizedPath(defaultPath: string, locale: string): Promise<LocalizedPathResult>;
    /**
     * @function fileExists
     * @description Checks whether a file exists.
     * @param {String} path The file path.
     * @returns {Promise<Boolean>} Is true if the file can be accessed, false otherwise.
     */
    static fileExists(path: string): Promise<boolean>;
    /**
     * @function isPath
     * @description Evaluates whether a string is a file path (as opposed to a URL for example).
     * @param {String} s The string to evaluate.
     * @returns {Boolean} Returns true if the evaluated string is a path.
     */
    static isPath(s: string): boolean;
    /**
     * Flattens an object and crates new keys with custom delimiters.
     * @param {Object} obj The object to flatten.
     * @param {String} [delimiter='.'] The delimiter of the newly generated keys.
     * @param {Object} result
     * @returns {Object} The flattened object.
     **/
    static flattenObject(obj: Record<string, any>, parentKey?: string, delimiter?: string, result?: Record<string, any>): Record<string, any>;
    /**
     * Determines whether an object is a Promise.
     * @param {any} object The object to validate.
     * @returns {Boolean} Returns true if the object is a promise.
     */
    static isPromise(object: any): boolean;
    /**
     * Creates an object with all permutations of the original keys.
     * For example, this definition:
     * ```
     * {
     *   a: [true, false],
     *   b: [1, 2],
     *   c: ['x']
     * }
     * ```
     * permutates to:
     * ```
     * [
     *   { a: true, b: 1, c: 'x' },
     *   { a: true, b: 2, c: 'x' },
     *   { a: false, b: 1, c: 'x' },
     *   { a: false, b: 2, c: 'x' }
     * ]
     * ```
     * @param {Object} object The object to permutate.
     * @param {Integer} [index=0] The current key index.
     * @param {Object} [current={}] The current result entry being composed.
     * @param {Array} [results=[]] The resulting array of permutations.
     */
    static getObjectKeyPermutations(object: Record<string, any[]>, index?: number, current?: Record<string, any>, results?: Record<string, any>[]): Record<string, any>[];
    /**
     * Validates parameters and throws if a parameter is invalid.
     * Example parameter types syntax:
     * ```
     * {
     *   parameterName: {
     *      t: 'boolean',
     *      v: isBoolean,
     *      o: true
     *   },
     *   ...
     * }
     * ```
     * @param {Object} params The parameters to validate.
     * @param {Array<Object>} types The parameter types used for validation.
     * @param {Object} types.t The parameter type; used for error message, not for validation.
     * @param {Object} types.v The function to validate the parameter value.
     * @param {Boolean} [types.o=false] Is true if the parameter is optional.
     */
    static validateParams(params: Record<string, any>, types: ParameterTypes): void;
    /**
     * Computes the relative date based on a string.
     * @param {String} text The string to interpret the date from.
     * @param {Date} now The date the string is comparing against.
     * @returns {Object} The relative date object.
     **/
    static relativeTimeToDate(text: string, now?: Date): RelativeTimeResult;
    /**
     * Deep-scans an object for a matching key/value definition.
     * @param {Object} obj The object to scan.
     * @param {String | undefined} key The key to match, or undefined if only the value should be matched.
     * @param {any | undefined} value The value to match, or undefined if only the key should be matched.
     * @returns {Boolean} True if a match was found, false otherwise.
     */
    static objectContainsKeyValue(obj: Record<string, any>, key?: string, value?: any): boolean;
    static checkProhibitedKeywords(config: ConfigWithKeywordDenylist | undefined, data: Record<string, any>): void;
    /**
     * Moves the nested keys of a specified key in an object to the root of the object.
     *
     * @param {Object} obj The object to modify.
     * @param {String} key The key whose nested keys will be moved to root.
     * @returns {Object} The modified object, or the original object if no modification happened.
     * @example
     * const obj = {
     *   a: 1,
     *   b: {
     *     c: 2,
     *     d: 3
     *   },
     *   e: 4
     * };
     * addNestedKeysToRoot(obj, 'b');
     * console.log(obj);
     * // Output: { a: 1, e: 4, c: 2, d: 3 }
    */
    static addNestedKeysToRoot(obj: Record<string, any>, key: string): Record<string, any>;
    /**
     * Encodes a string to be used in a URL.
     * @param {String} input The string to encode.
     * @returns {String} The encoded string.
     */
    static encodeForUrl(input: string): string;
}
export default Utils;
