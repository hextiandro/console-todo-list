require('colors');
const { storeInfo, readInfo } = require('./helpers/fileStore');
const { inquirerMenu, showTaskToCheck, confirm, listTaskToDelete, pause, readInput } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

console.clear();

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const storedTasks = readInfo()

    if (storedTasks) {
        tasks.loadTasks(storedTasks);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput("Description:");
                tasks.createTask(desc);
                break;
            case '2':
                tasks.listAll();
                break;
            case '3':
                tasks.listPendingCompletedTasks();
                break;
            case '4':
                tasks.listPendingCompletedTasks(false);
                break;
            case '5':
                const ids = await showTaskToCheck(tasks.list);
                tasks.toggleCompleted(ids);
                break;

            case '6':
                const id = await listTaskToDelete(tasks.list);
                if (id !== '0') {
                    const ok = await confirm("Are sure?");
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log("The task was removed successfully!!!");
                    }
                }
                break;
            default:
                break;
        }
        storeInfo(tasks.list);
        if (opt !== '0') await pause();
    } while (opt !== '0');
};

main();
