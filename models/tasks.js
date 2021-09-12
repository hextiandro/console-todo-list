const Task = require("./task");

class Tasks {
    _list = {}

    constructor() {
        this._list = {};
    }

    loadTasks(tasks = []) {
        tasks.map((task) => {
            this._list[task.id] = task;
        })
    }

    deleteTask(id = "") {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    get list() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key]
            list.push(task);
        })
        return list;
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    listAll() {
        this.list.forEach((task, i) => {
            console.log(`${i + 1} `.green + `${task.description} :: ${task.completedAt ? 'Completed'.green : 'Pending'.red}`)
        })
    }

    listPendingCompletedTasks(completed = true) {
        let counter = 0;
        this.list.forEach((task) => {

            if (completed) {
                if (task.completedAt) {
                    console.log(`${counter + 1}. `.green + `${task.description} :: ${task.completedAt.green}`)
                }
            } else {
                if (!task.completedAt) {
                    console.log(`${counter + 1}. `.green + `${task.description} :: ${'Pending'.red}`)
                }
            }
        });
    }

    toggleCompleted = (ids = []) => {
        ids.forEach((id) => {
            const task = this._list[id];
            if (!task.completedAt) {
                task.completedAt = new Date().toISOString();
            }
        })

        this.list.forEach((task) => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedAt = null;
                task.completedAt = null;
            }
        })
    }
}

module.exports = Tasks