module.exports = class UserDto {
    email;
    id;
    username;
    tokens;
    constructor(model) {
        this.email = model.email
        this.id = model.id
        this.username = model.username
        this.tokens = model.tokens
    }
}