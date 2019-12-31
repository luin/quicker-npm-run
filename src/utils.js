const spawn = require("cross-spawn");

function match(keyword, scriptNames) {
  const matched = scriptNames.find(name => name === keyword);
  if (matched) {
    return [matched];
  }

  return scriptNames.filter(name => {
    if (name.length < keyword.length) {
      return false;
    }

    let index = -1;
    for (let i = 0; i < keyword.length; i++) {
      const key = keyword[i];

      while (++index < name.length) {
        if (name[index] === key) {
          break;
        }
      }
    }

    return index < name.length;
  });
}

function formHumanCommand(app, parts) {
  return app + " " + parts.join(" ");
}

function run(app, parts) {
  /**
   * Copied from https://github.com/bahmutov/npm-quick-run/blob/master/src/run.js.
   */
  return new Promise(function(resolve, reject) {
    var npm = spawn(app, parts, { stdio: "inherit" });
    var testErrors = "";

    npm.on("error", function(err) {
      console.error(err);
      testErrors += err.toString();
    });

    npm.on("exit", function(code) {
      if (code) {
        const command = formHumanCommand(app, parts);
        const msg = "NPM command " + command + " failed with code " + code;
        console.error(msg);
        console.error(testErrors);
        const e = new Error(msg);
        return reject(e);
      }
      resolve();
    });
  });
}

exports.match = match;
exports.run = run;
