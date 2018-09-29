const packageInfo = require(`../package.json`);
const {AUTHOR_TASK: currentTask} = require(`../utils/task-constants`);

module.exports = {
  name: currentTask,
  description: `name of author`,
  execute() {
    console.log(packageInfo.author);
  }
};
