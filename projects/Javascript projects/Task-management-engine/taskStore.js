const fs = require("fs").promises;
const path = require("path");

const DATA_FILE = path.join(__dirname, "data.json");

async function readTasks() {
    try {
        const data = await fs.readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeTasks(tasks) {
    await fs.writeFile(
        DATA_FILE,
        JSON.stringify(tasks, null, 2)
    );
}

module.exports = {
    readTasks,
    writeTasks
};
