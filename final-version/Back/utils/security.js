// utils/security.js
// Aquí se pueden definir funciones o configuraciones adicionales para reforzar la seguridad,
// como la configuración de Content Security Policy (CSP), manejo de headers, etc.

exports.cspOptions = {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
        styleSrc: ["'self'", "trusted-cdn.com"],
        // Otras directivas según necesidad
    }
};
