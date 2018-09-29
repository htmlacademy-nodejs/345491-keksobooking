class ParentTask {
  constructor(name, info) {
    this.name = name;
    this.description = info;
  }

  execute(message) {
    console.log(message);
  }
}
