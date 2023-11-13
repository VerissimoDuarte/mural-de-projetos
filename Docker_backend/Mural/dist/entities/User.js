"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(props) {
        this.props = props;
    }
    get() {
        return this.props;
    }
    update(user) {
        this.props = user;
    }
    get id() {
        return this.props.id;
    }
}
exports.User = User;
