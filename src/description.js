const packageInfo = require(`../package.json`);
const {DESCRIPTION_TASK: currentTask} = require(`../utils/task-constants`);

module.exports = {
  name: currentTask,
  description: `some information`,
  execute() {
    console.log(packageInfo.description);
  }
};
