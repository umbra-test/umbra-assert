/// <reference types="mocha" />
/// <reference types="node" />
declare const getStructuredStackTrace: () => NodeJS.CallSite[];
export { getStructuredStackTrace };
