'use strict';

const http = require(`http`);
const fs = require(`fs`);
const url = require(`url`);
const dir = require(`path`);
const {promisify} = require(`util`);
const BaseTask = require(`../utils/task-constructor`);
const {SERVER_START_TASK: currentTask} = require(`../utils/task-constants`).Tasks;

const getStat = promisify(fs.stat);
const getDir = promisify(fs.readdir);
const getFile = promisify(fs.readFile);

const hostname = `127.0.0.1`;
const port = 3000;
const MESSAGE = `Server started`;
const DESCRIPTION = `connection with server`;

const readFile = async (path, res, type) => {
  const data = await getFile(path);
  res.setHeader(`Content-Type`, type);
  res.end(data);
};


class ServerStartTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, MESSAGE);
  }

  execute(servPort = port) {
    super.execute();

    const validPort = ((typeof servPort === `number`) && (servPort >= 0) && (servPort <= 65535)) ? servPort : port;

    const serverAddress = `http://${hostname}:${validPort}/`;

    function showDirectory(path, relativePath, files) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory content</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${serverAddress}${relativePath}/${it}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
    }

    const readDir = async (path, relativePath, res) => {
      const files = await getDir(path);
      res.setHeader(`content-type`, `text/html`);
      res.end(showDirectory(path, relativePath, files));
    };

    const server = http.createServer((req, res) => {

      (async () => {
        const localPath = url.parse(req.url).pathname;
        const absolutePath = process.cwd() + `/static` + localPath;

        try {

          const pathStat = await getStat(absolutePath);

          res.statusCode = 200;

          if (pathStat.isDirectory()) {
            await readDir(absolutePath, localPath, res);
          } else {
            let type = `text/plain`;

            switch (dir.extname(absolutePath)) {
              case `.html`:
                type = `text/html`;
                break;
              case `.ico`:
                type = `image/x-icon`;
                break;
              case `.css`:
                type = `text/css`;
                break;
              case `.png`:
                type = `image/png`;
                break;
              case `.svg`:
                type = `image/svg+xml`;
                break;
              case `.jpg`:
                type = `image/jpeg`;
                break;
              default:
                type = `text/plain`;
            }
            await readFile(absolutePath, res, type);
          }
        } catch (e) {
          res.writeHead(404, `Not Found`);
          res.end();
        }
      })().catch((e) => {
        res.writeHead(500, e.message, {
          'content-type': `text/plain`
        });
        res.end(e.message);
      });

    });

    server.listen(validPort, hostname, () => {
      console.log(`Server running at http://${hostname}:${validPort}/`);
    });
  }
}

module.exports = ServerStartTask;
