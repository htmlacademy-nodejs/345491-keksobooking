'use strict';

const colors = require(`colors/safe`);

const packageInfo = require(`../package.json`);
const {VERSION_TASK: currentTask} = require(`../utils/task-constants`).Tasks;
const BaseTask = require(`../utils/task-constructor`);

const DESCRIPTION = `program version`;
const MESSAGE = packageInfo.version;

function setColor(text) {
  let colorLetter = text.split(`.`);
  colorLetter[0] = colors.red(colorLetter[0]);
  colorLetter[1] = colors.green(colorLetter[1]);
  colorLetter[2] = colors.blue(colorLetter[2]);

  return `v ${colorLetter.join(`.`)}`;
}

class VersionTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, setColor(MESSAGE));
  }
}

module.exports = VersionTask;
