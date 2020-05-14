"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStructuredStackTrace = void 0;
const getStructuredStackTrace = () => {
    if (!Error.prepareStackTrace) {
        return [];
    }
    const originalPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (error, structuredStackTrace) => {
        return structuredStackTrace;
    };
    const stack = new Error().stack;
    const newStackTrace = stack ? stack.slice(1) : [];
    Error.prepareStackTrace = originalPrepareStackTrace;
    return newStackTrace;
};
exports.getStructuredStackTrace = getStructuredStackTrace;
//# sourceMappingURL=V8CallSite.js.map