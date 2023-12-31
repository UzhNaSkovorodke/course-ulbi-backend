module.exports = class ApiError extends Error {
    static;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, error = []) {
        return new ApiError(400, message, error)
    }
}