export declare type Context = Record<string, unknown> | ((path: string) => Record<string, unknown>) | ((path: string) => Promise<Record<string, unknown>>);
export declare function resolveContext(context: Context | undefined, pagePath: string): Promise<Record<string, unknown> | undefined>;
