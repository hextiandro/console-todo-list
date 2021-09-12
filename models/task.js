const { v4: uuidV4 } = require('uuid');

class Task {
    id = '';
    description = '';
    completedAt = null;

    constructor(description) {
        this.id = uuidV4();
        this.description = description;
        this.completedAt = null;
    }

}

module.exports = Task