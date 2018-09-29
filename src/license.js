const packageInfo = require(`../package.json`);
const {LICENSE_TASK: currentTask} = require(`../utils/task-constants`);

module.exports = {
  name: currentTask,
  description: `type of license`,
  execute() {
    console.log(packageInfo.license);
  }
};
