const packageInfo = require(`../package.json`);
const {VERSION_TASK: currentTask} = require(`../utils/task-constants`);

module.exports = {
  name: currentTask,
  description: `program version`,
  execute() {
    console.log(`v${packageInfo.version}`);
  }
};
