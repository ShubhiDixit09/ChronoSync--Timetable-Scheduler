// Placeholder for request-body validation helpers (e.g. via joi/zod later).
const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

module.exports = { isNonEmptyString };
