"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
class Project {
    constructor(props) {
        this.props = props;
    }
    get() {
        return Object.assign({}, this.props);
    }
    update(project) {
        this.props = project;
    }
}
exports.Project = Project;
