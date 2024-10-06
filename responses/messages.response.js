export const responseMessages = {
    // Success Messages
    SUCCESS: 'Operation completed successfully.',
    CREATED: (entity) => `${entity} created successfully.`,
    UPDATED: (entity) => `${entity} updated successfully.`,
    DELETED: (entity) => `${entity} deleted successfully.`,
    FETCHED: (entity) => `${entity} fetched successfully.`,

    // Error Messages
    SOMETHING_WENT_WRONG: 'Something went wrong.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',

    // Validation Errors
    VALIDATION_FAILED: (entity) => `${entity} validation failed.`,
    MISSING_FIELDS: 'Some required fields are missing.',
    INVALID_FIELDS: 'Some fields contain invalid data.',
    INVALID_EMAIL: 'The provided email is invalid.',
    PASSWORD_TOO_SHORT: 'The password is too short, it must be at least 6 characters long.',

    // Resource Not Found
    NOT_FOUND: (entity) => `${entity} not found.`,
    RESOURCE_NOT_FOUND: 'Requested resource not found.',

    // Authentication & Authorization
    UNAUTHORIZED: 'Unauthorized access.',
    FORBIDDEN: (entity) => `${entity} access denied.`,
    TOKEN_EXPIRED: 'Your session has expired. Please login again.',
    INVALID_TOKEN: 'The provided token is invalid or expired.',
    LOGIN_REQUIRED: 'Please log in to access this resource.',

    // Conflict & Duplication
    DUPLICATE_ENTRY: (entity) => `Duplicate entry for ${entity}.`,
    ALREADY_EXISTS: (entity) => `${entity} already exists.`,
    CONFLICT: (entity) => `Conflict with existing ${entity}.`,

    // Bad Request
    BAD_REQUEST: 'Bad request. Please check the input parameters.',
    INVALID_REQUEST: 'Invalid request format.',
    INVALID_CREDENTIALS: 'The provided credentials are incorrect.',

    // Rate Limiting
    TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',

    // File & Upload
    FILE_TOO_LARGE: 'The file size exceeds the allowed limit.',
    INVALID_FILE_TYPE: 'The uploaded file type is not supported.',

    // Success with No Content
    NO_CONTENT: 'No content to display.',

    // Custom Message
    CUSTOM: (status, message) => `${status}: ${message}`
}
