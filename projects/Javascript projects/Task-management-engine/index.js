const {
    getTasks,
    addTask,
    toggleTask
} = require("./taskService");

async function runApp() {
    try {
        console.log("Initial tasks:", await getTasks());

        const task1 = await addTask("Learn backend JavaScript");
        const task2 = await addTask("Understand async/await");

        console.log("After adding tasks:", await getTasks());

        await toggleTask(task1.id);

        console.log("After toggling first task:", await getTasks());

    } catch (error) {
        console.error("Application Error:", error.message);
    }
}

runApp();
