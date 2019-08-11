const getStructuredStackTrace = (): NodeJS.CallSite[] => {
    if (!Error.prepareStackTrace) {
        return [];
    }

    const originalPrepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = (error: Error, structuredStackTrace: NodeJS.CallSite[]): NodeJS.CallSite[] => {
        return structuredStackTrace;
    };

    const stack = new Error().stack;
	const structuredStackTrace: NodeJS.CallSite[] = stack ? stack.slice(1) as unknown as NodeJS.CallSite[] : [];
	Error.prepareStackTrace = originalPrepareStackTrace;
	return structuredStackTrace;
};

export {
    getStructuredStackTrace
};