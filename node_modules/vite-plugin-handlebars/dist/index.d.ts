import { compile, HelperDeclareSpec, RuntimeOptions } from 'handlebars';
import { Plugin as VitePlugin } from 'vite';
import { Context } from './context';
declare type CompileArguments = Parameters<typeof compile>;
declare type CompileOptions = CompileArguments[1];
export interface HandlebarsPluginConfig {
    context?: Context;
    reloadOnPartialChange?: boolean;
    compileOptions?: CompileOptions;
    runtimeOptions?: RuntimeOptions;
    partialDirectory?: string | Array<string>;
    helpers?: HelperDeclareSpec;
}
export default function handlebars({ context, reloadOnPartialChange, compileOptions, runtimeOptions, partialDirectory, helpers, }?: HandlebarsPluginConfig): VitePlugin;
export {};
