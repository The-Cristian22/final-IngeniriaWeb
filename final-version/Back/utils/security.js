
exports.cspOptions = {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
        styleSrc: ["'self'", "trusted-cdn.com"],
    }
};
