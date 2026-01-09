const { readTasks, writeTasks } = require("./taskStore");

async function getTasks() {
    return await readTasks();
}

async function addTask(text) {
    if (!text) {
        throw new Error("Task text is required");
    }

    const tasks = await readTasks();

    const newTask = {
        id: Date.now(),
        text,
        completed: false
    };

    const updatedTasks = [...tasks, newTask];
    await writeTasks(updatedTasks);

    return newTask;
}

async function toggleTask(id) {
    const tasks = await readTasks();

    const updatedTasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    await writeTasks(updatedTasks);
    return updatedTasks;
}

module.exports = {
    getTasks,
    addTask,
    toggleTask
};
