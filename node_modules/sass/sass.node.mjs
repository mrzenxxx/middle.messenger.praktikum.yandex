import * as util from "util"
import * as stream from "stream"
import * as fs from "fs"
import * as immutable from "immutable"
import "./sass.dart.js";

const _cliPkgLibrary = globalThis._cliPkgExports.pop();
if (globalThis._cliPkgExports.length === 0) delete globalThis._cliPkgExports;
const _cliPkgExports = {};
_cliPkgLibrary.load({util, stream, fs, immutable}, _cliPkgExports);

export const compile = _cliPkgExports.compile;
export const compileAsync = _cliPkgExports.compileAsync;
export const compileString = _cliPkgExports.compileString;
export const compileStringAsync = _cliPkgExports.compileStringAsync;
export const Logger = _cliPkgExports.Logger;
export const SassArgumentList = _cliPkgExports.SassArgumentList;
export const SassBoolean = _cliPkgExports.SassBoolean;
export const SassColor = _cliPkgExports.SassColor;
export const SassFunction = _cliPkgExports.SassFunction;
export const SassList = _cliPkgExports.SassList;
export const SassMap = _cliPkgExports.SassMap;
export const SassNumber = _cliPkgExports.SassNumber;
export const SassString = _cliPkgExports.SassString;
export const Value = _cliPkgExports.Value;
export const CustomFunction = _cliPkgExports.CustomFunction;
export const ListSeparator = _cliPkgExports.ListSeparator;
export const sassFalse = _cliPkgExports.sassFalse;
export const sassNull = _cliPkgExports.sassNull;
export const sassTrue = _cliPkgExports.sassTrue;
export const Exception = _cliPkgExports.Exception;
export const PromiseOr = _cliPkgExports.PromiseOr;
export const info = _cliPkgExports.info;
export const render = _cliPkgExports.render;
export const renderSync = _cliPkgExports.renderSync;
export const TRUE = _cliPkgExports.TRUE;
export const FALSE = _cliPkgExports.FALSE;
export const NULL = _cliPkgExports.NULL;
export const types = _cliPkgExports.types;

let printedDefaultExportDeprecation = false;
function defaultExportDeprecation() {
  if (printedDefaultExportDeprecation) return;
  printedDefaultExportDeprecation = true;
  console.error(
      "`import sass from 'sass'` is deprecated.\n" +
      "Please use `import * as sass from 'sass'` instead.");
}

export default {
  get compile() {
    defaultExportDeprecation();
    return _cliPkgExports.compile;
  },
  get compileAsync() {
    defaultExportDeprecation();
    return _cliPkgExports.compileAsync;
  },
  get compileString() {
    defaultExportDeprecation();
    return _cliPkgExports.compileString;
  },
  get compileStringAsync() {
    defaultExportDeprecation();
    return _cliPkgExports.compileStringAsync;
  },
  get Logger() {
    defaultExportDeprecation();
    return _cliPkgExports.Logger;
  },
  get SassArgumentList() {
    defaultExportDeprecation();
    return _cliPkgExports.SassArgumentList;
  },
  get SassBoolean() {
    defaultExportDeprecation();
    return _cliPkgExports.SassBoolean;
  },
  get SassColor() {
    defaultExportDeprecation();
    return _cliPkgExports.SassColor;
  },
  get SassFunction() {
    defaultExportDeprecation();
    return _cliPkgExports.SassFunction;
  },
  get SassList() {
    defaultExportDeprecation();
    return _cliPkgExports.SassList;
  },
  get SassMap() {
    defaultExportDeprecation();
    return _cliPkgExports.SassMap;
  },
  get SassNumber() {
    defaultExportDeprecation();
    return _cliPkgExports.SassNumber;
  },
  get SassString() {
    defaultExportDeprecation();
    return _cliPkgExports.SassString;
  },
  get Value() {
    defaultExportDeprecation();
    return _cliPkgExports.Value;
  },
  get CustomFunction() {
    defaultExportDeprecation();
    return _cliPkgExports.CustomFunction;
  },
  get ListSeparator() {
    defaultExportDeprecation();
    return _cliPkgExports.ListSeparator;
  },
  get sassFalse() {
    defaultExportDeprecation();
    return _cliPkgExports.sassFalse;
  },
  get sassNull() {
    defaultExportDeprecation();
    return _cliPkgExports.sassNull;
  },
  get sassTrue() {
    defaultExportDeprecation();
    return _cliPkgExports.sassTrue;
  },
  get Exception() {
    defaultExportDeprecation();
    return _cliPkgExports.Exception;
  },
  get PromiseOr() {
    defaultExportDeprecation();
    return _cliPkgExports.PromiseOr;
  },
  get info() {
    defaultExportDeprecation();
    return _cliPkgExports.info;
  },
  get render() {
    defaultExportDeprecation();
    return _cliPkgExports.render;
  },
  get renderSync() {
    defaultExportDeprecation();
    return _cliPkgExports.renderSync;
  },
  get TRUE() {
    defaultExportDeprecation();
    return _cliPkgExports.TRUE;
  },
  get FALSE() {
    defaultExportDeprecation();
    return _cliPkgExports.FALSE;
  },
  get NULL() {
    defaultExportDeprecation();
    return _cliPkgExports.NULL;
  },
  get types() {
    defaultExportDeprecation();
    return _cliPkgExports.types;
  },
};
