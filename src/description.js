const packageInfo = require(`../package.json`);
const {DESCRIPTION_TASK: currentTask} = require(`../utils/task-constants`);
const ParentTask = require(`../utils/task-constructor`);

const DESCRIPTION = `some information`;
const MESSAGE = packageInfo.description;

const descriptionTask = new ParentTask(currentTask, DESCRIPTION, MESSAGE);

module.exports = descriptionTask;

