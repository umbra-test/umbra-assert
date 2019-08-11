"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStructuredStackTrace = () => {
    if (!Error.prepareStackTrace) {
        return [];
    }
    const originalPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (error, structuredStackTrace) => {
        return structuredStackTrace;
    };
    const stack = new Error().stack;
    const structuredStackTrace = stack ? stack.slice(1) : [];
    Error.prepareStackTrace = originalPrepareStackTrace;
    return structuredStackTrace;
};
exports.getStructuredStackTrace = getStructuredStackTrace;
//# sourceMappingURL=V8CallSite.js.map