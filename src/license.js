'use strict';

const packageInfo = require(`../package.json`);
const {LICENSE_TASK: currentTask} = require(`../utils/task-constants`).Tasks;
const BaseTask = require(`../utils/task-constructor`);

const DESCRIPTION = `type of license`;
const MESSAGE = packageInfo.license;

class LicenseTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, MESSAGE);
  }
}

const licenseTask = new LicenseTask();

module.exports = licenseTask;

