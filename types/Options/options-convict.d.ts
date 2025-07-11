import * as convict from 'convict';
export type ParseServerOptions = {
    appId: string;
    masterKey: string | (() => void);
    serverURL: string;
    javascriptKey?: string;
};
export declare const ParseServerOptionsSchema: convict.Config<ParseServerOptions>;
